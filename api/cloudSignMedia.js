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
      return res.status(500).json({ error: "Cloudinary envs missing" });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "portfolio_tiago_media"; // Pasta onde as mídias vão ficar organizadas

    const params = {
      folder,
      timestamp: String(timestamp),
    };

    // Assina os parâmetros
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
      folder,
      signature,
    });
  } catch (err) {
    console.error("cloudSignMedia error:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
