import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

const IMAGE_FOLDER = "products";

function sanitizeFileName(name) {
  const base = name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "");
  return base || "image";
}

function pathFromUrl(url) {
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/\/o\/(.+)/);
    if (match) return decodeURIComponent(match[1]);
  } catch {
    // not a URL — treat as a raw storage path
  }
  return url;
}

export async function uploadProductImage(file) {
  const path = `${IMAGE_FOLDER}/${Date.now()}-${sanitizeFileName(file.name)}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { url, path };
}

export async function deleteProductImage(pathOrUrl) {
  if (!pathOrUrl) return;
  const path = pathFromUrl(pathOrUrl);
  await deleteObject(ref(storage, path));
}

const storageService = { uploadProductImage, deleteProductImage };

export default storageService;