import localProjects from "../data/projectsData.json";
import localConfig from "../data/siteConfig.json";

export async function fetchProjects() {
  try {
    const response = await fetch(`/api/getData?dataset=projects&cb=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Falha ao buscar projetos");
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) return data;
    return localProjects;
  } catch (error) {
    console.warn("Usando projetos locais:", error);
    return localProjects;
  }
}

export async function fetchConfig() {
  try {
    const response = await fetch(`/api/getData?dataset=config&cb=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return localConfig;
    const data = await response.json();
    // Se vier um objeto com aboutText, usa ele. Se vier vazio ou array, usa o local.
    return (data && data.aboutText) ? data : localConfig;
  } catch (error) {
    return localConfig;
  }
}

export async function fetchDemos() {
  try {
    const response = await fetch(`/api/getData?dataset=demos&cb=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

export function getLocalProjects() {
  return localProjects;
}
