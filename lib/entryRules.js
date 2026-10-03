// Entry rules from entry-rules.md, as pure functions. No imports, so both the
// form (client) and anything else can use them. The database repeats the
// length/format rules as check constraints; this file is the friendly layer.

export const PROVINCES = [
  "Banteay Meanchey", "Battambang", "Kampong Cham", "Kampong Chhnang",
  "Kampong Speu", "Kampong Thom", "Kampot", "Kandal", "Kep", "Koh Kong",
  "Kratie", "Mondulkiri", "Oddar Meanchey", "Pailin", "Phnom Penh",
  "Preah Sihanouk", "Preah Vihear", "Prey Veng", "Pursat", "Ratanakiri",
  "Siem Reap", "Stung Treng", "Svay Rieng", "Takeo", "Tbong Khmum",
];

export const LIMITS = { name: 100, source: 100, description: 1200, link: 500 };
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

const KHMER = /[ក-៿]/;
const ENGLISH_NAME = /^[A-Za-z0-9 ,.'()&/-]+$/;
const BLOCKED_SOURCES = /^(google|chatgpt|claude|common knowledge|n\/a|none)$/i;
const FILLER = /^(test|asdf|\.+)$/i;

// Trims every text field. Run this before validating and before saving.
export function cleanEntry(values) {
  const clean = {};
  for (const [key, value] of Object.entries(values)) {
    clean[key] = typeof value === "string" ? value.trim() : value;
  }
  return clean;
}

function sentenceCount(text) {
  return text.split(/[.!?។]+/).filter((s) => s.trim().length > 0).length;
}

function tooLong(value, max) {
  return value.length > max ? `Keep this under ${max} characters.` : "";
}

// Returns { field: "short message" } for every field that needs fixing.
// An empty object means the entry is valid. Expects cleanEntry() output.
export function validateEntry(v) {
  const errors = {};

  if (!v.khmerName) errors.khmerName = "Write the name in Khmer script.";
  else if (!KHMER.test(v.khmerName)) errors.khmerName = "This needs Khmer script, not Latin letters.";
  else errors.khmerName = tooLong(v.khmerName, LIMITS.name);

  if (!v.englishName) errors.englishName = "Write the name in English.";
  else if (!ENGLISH_NAME.test(v.englishName)) errors.englishName = "Use English letters only.";
  else errors.englishName = tooLong(v.englishName, LIMITS.name);

  errors.romanization = tooLong(v.romanization, LIMITS.name);

  if (!PROVINCES.includes(v.place)) errors.place = "Choose one of Cambodia's 25 provinces.";

  if (!v.source) errors.source = "Say who in your family you learned this from, e.g. Grandmother.";
  else if (BLOCKED_SOURCES.test(v.source)) errors.source = "Name a person in your family, not a website or tool.";
  else errors.source = tooLong(v.source, LIMITS.source);

  if (v.link) {
    if (!/^https:\/\/[^\s/]+\.[^\s/]+/.test(v.link) || /\s/.test(v.link)) {
      errors.link = "A link must be complete and start with https://";
    } else if (/\/\/(bit\.ly|tinyurl\.com|t\.co)\b/i.test(v.link)) {
      errors.link = "Use the full page address, not a shortened link.";
    } else errors.link = tooLong(v.link, LIMITS.link);
  }

  if (!v.description || FILLER.test(v.description)) errors.description = "Describe the object in 2 to 5 sentences.";
  else if (sentenceCount(v.description) < 2) errors.description = "Use at least 2 full sentences.";
  else if (sentenceCount(v.description) > 5) errors.description = "Use at most 5 sentences.";
  else errors.description = tooLong(v.description, LIMITS.description);

  for (const key of Object.keys(errors)) if (!errors[key]) delete errors[key];
  return errors;
}

// Checks the picked file's declared type and size. The bucket enforces the
// same limits; this just tells the user before anything is uploaded.
export function validatePhotoFile(file) {
  if (!file) return "Add a photo of the object.";
  if (!PHOTO_TYPES.includes(file.type)) return "The photo must be a JPEG, PNG or WebP image.";
  if (file.size > MAX_PHOTO_BYTES) return "The photo must be 5 MB or smaller.";
  return "";
}
