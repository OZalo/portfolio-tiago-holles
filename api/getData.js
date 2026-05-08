// api/getData.js
// Lê um dataset JSON (RAW) da Cloudinary.
import { DATASETS } from "./dataSets.js";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dje6clroh';

function buildRawUrl(publicId) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/${publicId}.json`;
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { dataset } = req.query;
    const publicId = DATASETS[dataset];

    if (!publicId) {
      return res.status(200).json([]);
    }

    const rawUrl = buildRawUrl(publicId);

    let upstream;
    try {
      upstream = await fetch(`${rawUrl}?cb=${Date.now()}`, { cache: "no-store" });
    } catch (err) {
      console.error("[getData] fetch error", dataset, err);
      return res.status(200).json([]);
    }

    if (!upstream.ok) {
      console.error("[getData] upstream error", dataset, upstream.status);
      return res.status(200).json([]);
    }

    const data = await upstream.json().catch(() => []);
    
    res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");
    // Se data for um array, retorna array. Se for objeto, retorna objeto. Caso contrário []
    const result = data ? data : [];
    return res.status(200).json(result);
  } catch (err) {
    console.error("getData error:", err);
    return res.status(200).json([]);
  }
}
