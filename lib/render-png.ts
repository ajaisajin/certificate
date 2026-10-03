import { getBrowser } from "@/lib/browser";
import type { CertificateData } from "@/types/certificate";

// Must equal the template's --cert-w and --cert-h.
const CERT_WIDTH = 1056;
const CERT_HEIGHT = 816;
const DEVICE_SCALE_FACTOR = 3;

const RENDER_PATH = "/render/certificate";

// Renders run one at a time; each waits for the one before it.
let queue: Promise<unknown> = Promise.resolve();

function renderUrl(data: CertificateData): string {
  // Always this server on loopback. Never derived from the request.
  const origin = `http://127.0.0.1:${process.env.PORT ?? 3000}`;
  return `${origin}${RENDER_PATH}?${new URLSearchParams({ ...data })}`;
}

async function capture(data: CertificateData): Promise<Uint8Array> {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    await page.setViewport({
      width: CERT_WIDTH,
      height: CERT_HEIGHT,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
    });
    const response = await page.goto(renderUrl(data), { waitUntil: "load" });
    if (!response?.ok()) {
      throw new Error(`Render page responded ${response?.status() ?? "nothing"}`);
    }
    await page.evaluate(() => document.fonts.ready.then(() => undefined));

    const certificate = await page.$("article");
    if (!certificate) throw new Error("Render page has no certificate");
    return await certificate.screenshot({ type: "png" });
  } finally {
    await page.close();
  }
}

export function renderCertificatePng(data: CertificateData): Promise<Uint8Array> {
  const result = queue.then(() => capture(data));
  // A failed render must not block the renders queued behind it.
  queue = result.catch(() => undefined);
  return result;
}
