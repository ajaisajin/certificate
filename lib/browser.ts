import puppeteer, { type Browser } from "puppeteer";

const LAUNCH_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
];

// Cached on globalThis so dev hot reload reuses the browser instead of
// launching another one per module instance.
const globalForBrowser = globalThis as typeof globalThis & {
  certificateBrowser?: Promise<Browser>;
};

function forgetBrowser() {
  globalForBrowser.certificateBrowser = undefined;
}

async function launchBrowser(): Promise<Browser> {
  const browser = await puppeteer.launch({ args: LAUNCH_ARGS });
  browser.on("disconnected", forgetBrowser);
  return browser;
}

/** The one shared browser. Open a page per render; never close the browser. */
export function getBrowser(): Promise<Browser> {
  if (!globalForBrowser.certificateBrowser) {
    const launch = launchBrowser();
    launch.catch(forgetBrowser);
    globalForBrowser.certificateBrowser = launch;
  }
  return globalForBrowser.certificateBrowser;
}
