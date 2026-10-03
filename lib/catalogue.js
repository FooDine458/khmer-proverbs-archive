// Pure helpers only, no imports: lib/entries.js pulls in the server-only
// Supabase client (next/headers), so anything a client component needs
// (like the source filter in ArchiveExplorer) has to live here instead,
// separate from that server-only import chain.

// Entries with this contributor are researched general history; everything
// else (e.g. "Grandmother") is a personal, family-sourced account. Shared
// by the source filter, the card eyebrow, and the entry detail provenance.
export const GENERAL_CONTRIBUTOR = "Common in Khmer households";

export function isGeneralHistory(entry) {
  return entry.contributor === GENERAL_CONTRIBUTOR;
}

// Attaches a stable catalogue number (this entry's position in the fetched
// list) and a category label, so pages don't each re-derive them.
export function withCatalogueInfo(entries) {
  return entries.map((entry, i) => ({
    ...entry,
    number: i + 1,
    category: isGeneralHistory(entry) ? "general" : "personal",
  }));
}
