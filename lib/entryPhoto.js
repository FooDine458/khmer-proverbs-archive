import { PHOTO_TYPES } from "./entryRules.js";

const EXTENSIONS = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

// OWASP file-upload guidance: don't trust the declared type or the filename.
// Read the file's first bytes and confirm they match a real JPEG, PNG or WebP.
async function detectType(file) {
  const b = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const ascii = (from, to) => String.fromCharCode(...b.slice(from, to));
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b[0] === 0x89 && ascii(1, 4) === "PNG") return "image/png";
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  return null;
}

// Uploads to photos/<user id>/<random uuid>.<ext> and returns the public URL.
// The extension comes from the detected type, never from the file's own name.
// Throws on failure; the caller logs it and shows a safe message.
export async function uploadPhoto(supabase, userId, file) {
  const type = await detectType(file);
  if (!type || !PHOTO_TYPES.includes(type) || type !== file.type) {
    throw new Error("File contents do not match an allowed image type");
  }
  const path = `${userId}/${crypto.randomUUID()}.${EXTENSIONS[type]}`;
  const { error } = await supabase.storage
    .from("photos")
    .upload(path, file, { contentType: type, upsert: false });
  if (error) throw error;
  return supabase.storage.from("photos").getPublicUrl(path).data.publicUrl;
}
