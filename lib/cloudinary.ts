// Uploads an announcement image to Cloudinary (free) from the browser and returns its link.
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "";

export const hasCloudinary = Boolean(cloudName && uploadPreset);

export async function uploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", uploadPreset);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body });
  if (!res.ok) throw new Error("The image didn’t upload. Check your Cloudinary settings and try again.");
  const data = (await res.json()) as { secure_url?: string };
  if (!data.secure_url) throw new Error("The image didn’t upload. Try again.");
  return data.secure_url;
}
