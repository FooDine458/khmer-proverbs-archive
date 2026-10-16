// Tells the server to drop its cached list of published entries. Call this
// after a save, review or delete, before navigating away. A failure is fine:
// the cache expires by itself within a minute.
export async function refreshPublicList() {
  try {
    await fetch("/api/revalidate", { method: "POST" });
  } catch {
    // Offline or blocked: nothing to do.
  }
}
