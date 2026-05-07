// src/services/dataCloudRaw.js
import { DATASETS } from "./dataSets";
import { fetchProjects } from "./dataService";

function getConfig(dataset) {
  const cfg = DATASETS[dataset];
  if (!cfg || !cfg.baseUrl) {
    throw new Error(`Dataset inválido: '${dataset}'`);
  }
  return cfg;
}

function parseRawUrl(url) {
  // Extrai o public_id do URL (ex: projectsData_tiago.json)
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  const publicIdBase = fileName.replace(".json", "");
  return { publicIdBase };
}

export async function uploadJsonToCloudinary(dataset, items) {
  const cfg = getConfig(dataset);
  const { publicIdBase } = parseRawUrl(cfg.baseUrl);

  // Busca a assinatura na nossa API local
  const sigRes = await fetch(
    `/api/cloudSignJson?public_id=${encodeURIComponent(publicIdBase)}`
  );

  const sig = await sigRes.json().catch(() => ({}));
  if (!sigRes.ok || !sig?.signature) {
    console.error("[dataCloudRaw] falha ao assinar", sig);
    throw new Error(sig?.error || "Falha ao assinar (cloudSignJson)");
  }

  const pretty = JSON.stringify(items, null, 2);
  if (!pretty || pretty === "null") throw new Error("Dados inválidos para upload");
  const blob = new Blob([pretty], { type: "application/json" });

  const form = new FormData();
  form.append("file", blob, `${publicIdBase}.json`);
  form.append("api_key", sig.apiKey);
  form.append("timestamp", String(sig.timestamp));
  form.append("public_id", sig.public_id);
  form.append("signature", sig.signature);
  form.append("invalidate", sig.invalidate || "1");
  form.append("overwrite", sig.overwrite || "1");

  const endpoint = `https://api.cloudinary.com/v1_1/${sig.cloudName}/raw/upload`;
  const up = await fetch(endpoint, { method: "POST", body: form });
  const data = await up.json().catch(() => ({}));

  if (!up.ok) {
    console.error("[dataCloudRaw] Cloudinary RAW upload error:", data);
    throw new Error(data?.error?.message || "Falha ao salvar JSON no Cloudinary");
  }

  return data;
}

/**
 * Adiciona um novo projeto
 */
export async function appendProject(payload) {
  const list = await fetchProjects();
  
  const maxId = list.reduce((max, item) => {
    const raw = typeof item.id === "number" ? item.id : parseInt(item.id, 10);
    return Number.isFinite(raw) && raw > max ? raw : max;
  }, 0);

  const newItem = { ...payload, id: maxId + 1 };
  const newList = [...list, newItem];

  await uploadJsonToCloudinary("projects", newList);

  return { ok: true, id: newItem.id };
}
