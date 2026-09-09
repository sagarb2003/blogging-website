import "server-only";
import crypto from "crypto";

/**
 * Returns a signed set of params the client can use to upload directly to
 * Cloudinary. The API secret never leaves the server — unlike the previous
 * setup, which used an unsigned upload preset anyone could POST to.
 */
export function getUploadSignature() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary env vars are not configured");
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = "blogvista";
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");

  return { cloudName, apiKey, timestamp, folder, signature };
}
