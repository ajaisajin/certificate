export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { getBrowser } = await import("@/lib/browser");
  // Not awaited: a slow or failed launch must not hold up server boot. A
  // failed launch is retried by the first export request.
  getBrowser().catch((error: unknown) => {
    console.error("Could not launch the export browser at boot", error);
  });
}
