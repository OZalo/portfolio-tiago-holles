// api/cloudSignJson.js
import crypto from "crypto";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const {
      CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET,
    } = process.env;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return res.status(500).json({
        error: "Cloudinary envs missing (CLOUDINARY_*)",
      });
    }

    const base = `${req.headers["x-forwarded-proto"] || "https"}://${
      req.headers.host || "localhost"
    }`;
    const urlObj = new URL(req.url || "/api/cloudSignJson", base);

    let publicId = (urlObj.searchParams.get("public_id") || "").trim();
    if (!publicId) {
      return res.status(400).json({ error: "public_id é obrigatório" });
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const params = {
      invalidate: "1",
      overwrite: "1",
      public_id: publicId,
      timestamp: String(timestamp),
    };

    const toSign =
      Object.keys(params)
        .sort()
        .map((k) => `${k}=${params[k]}`)
        .join("&") + CLOUDINARY_API_SECRET;

    const signature = crypto.createHash("sha1").update(toSign).digest("hex");

    return res.status(200).json({
      cloudName: CLOUDINARY_CLOUD_NAME,
      apiKey: CLOUDINARY_API_KEY,
      timestamp,
      public_id: publicId,
      signature,
      invalidate: params.invalidate,
      overwrite: params.overwrite,
    });
  } catch (err) {
    console.error("cloudSignJson error:", err);
    return res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
}
