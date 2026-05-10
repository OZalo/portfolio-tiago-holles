import localProjects from "../data/projectsData.json";
import localConfig from "../data/siteConfig.json";
import localAbout from "../data/aboutData.json";

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

export async function fetchAbout() {
  try {
    const response = await fetch(`/api/getData?dataset=about&cb=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return localAbout;
    const data = await response.json();
    return (data && data.text) ? data : localAbout;
  } catch (error) {
    return localAbout;
  }
}

export async function fetchConfig() {
  return localConfig;
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
