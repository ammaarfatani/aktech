export const CV_MAX_BYTES = 5 * 1024 * 1024;
export const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

export function blobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function careersApplyEnabled() {
  return blobConfigured();
}

export function allowedCv(file: File) {
  const name = file.name.toLowerCase();
  const extensionOk = CV_EXTENSIONS.some((ext) => name.endsWith(ext));
  const typeOk = !file.type || CV_TYPES.includes(file.type);
  return file.size > 0 && file.size <= CV_MAX_BYTES && extensionOk && typeOk;
}
