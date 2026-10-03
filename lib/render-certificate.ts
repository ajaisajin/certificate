import type { Page } from "puppeteer";
import { getBrowser } from "@/lib/browser";
import type { CertificateData } from "@/types/certificate";

// Must equal the template's --cert-w and --cert-h (US Letter landscape at 96dpi).
const CERT_WIDTH = 1056;
const CERT_HEIGHT = 816;
const PNG_SCALE_FACTOR = 3;

const RENDER_PATH = "/render/certificate";

type Capture = (page: Page) => Promise<Uint8Array>;

// PNG and PDF renders share this queue and run one at a time.
let queue: Promise<unknown> = Promise.resolve();

function renderUrl(data: CertificateData): string {
  // Always this server on loopback. Never derived from the request.
  const origin = `http://127.0.0.1:${process.env.PORT ?? 3000}`;
  return `${origin}${RENDER_PATH}?${new URLSearchParams({ ...data })}`;
}

async function renderPage(
  data: CertificateData,
  deviceScaleFactor: number,
  capture: Capture,
): Promise<Uint8Array> {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    await page.setViewport({
      width: CERT_WIDTH,
      height: CERT_HEIGHT,
      deviceScaleFactor,
    });
    const response = await page.goto(renderUrl(data), { waitUntil: "load" });
    if (!response?.ok()) {
      throw new Error(`Render page responded ${response?.status() ?? "nothing"}`);
    }
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    return await capture(page);
  } finally {
    await page.close();
  }
}

function enqueue(
  data: CertificateData,
  deviceScaleFactor: number,
  capture: Capture,
): Promise<Uint8Array> {
  const result = queue.then(() => renderPage(data, deviceScaleFactor, capture));
  // A failed render must not block the renders queued behind it.
  queue = result.catch(() => undefined);
  return result;
}

async function capturePng(page: Page): Promise<Uint8Array> {
  const certificate = await page.$("article");
  if (!certificate) throw new Error("Render page has no certificate");
  return certificate.screenshot({ type: "png" });
}

async function capturePdf(page: Page): Promise<Uint8Array> {
  // Screen media keeps the PDF on the same CSS as the preview and the PNG.
  await page.emulateMediaType("screen");
  return page.pdf({
    format: "Letter",
    landscape: true,
    printBackground: true,
    // The template carries its own inset, so the page adds no margin.
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
}

export function renderCertificatePng(data: CertificateData): Promise<Uint8Array> {
  return enqueue(data, PNG_SCALE_FACTOR, capturePng);
}

export function renderCertificatePdf(data: CertificateData): Promise<Uint8Array> {
  return enqueue(data, 1, capturePdf);
}
