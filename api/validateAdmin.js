// api/validateAdmin.js
import crypto from "crypto";

const TOKEN_COOKIE = "admin_token";

function base64urlEncode(str) {
  return Buffer.from(str, "utf8").toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function signToken(payload, secret) {
  const body = base64urlEncode(JSON.stringify(payload));
  const sig = crypto.createHmac("sha256", secret).update(body).digest("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  return `${body}.${sig}`;
}

export default async function handler(req, res) {
  const { ADMIN_PASS } = process.env;

  if (req.method === "POST") {
    const { password } = req.body;
    if (password === ADMIN_PASS) {
      const token = signToken({ sub: "admin", iat: Math.floor(Date.now() / 1000) }, ADMIN_PASS);
      res.setHeader("Set-Cookie", `${TOKEN_COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/`);
      return res.status(200).json({ ok: true });
    }
    return res.status(401).json({ ok: false, error: "Senha incorreta" });
  }

  if (req.method === "GET") {
    // Simplificado para teste local: verifica se o cookie existe
    const cookies = req.headers.cookie || "";
    if (cookies.includes(TOKEN_COOKIE)) {
      return res.status(200).json({ ok: true });
    }
    return res.status(401).json({ ok: false });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
