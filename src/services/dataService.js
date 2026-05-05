import localProjects from "../data/projectsData.json";
import localConfig from "../data/siteConfig.json";

export async function fetchProjects() {
  try {
    const response = await fetch(`/api/getData?dataset=projects&cb=${Date.now()}&t=${new Date().getTime()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Falha ao buscar projetos via API");
    const data = await response.json();
    return Array.isArray(data) && data.length > 0 ? data : localProjects;
  } catch (error) {
    console.warn("Usando projetos locais (fallback):", error);
    return localProjects;
  }
}

export async function fetchConfig() {
  try {
    const response = await fetch(`/api/getData?dataset=config&cb=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Falha ao buscar config via API");
    const data = await response.json();
    return data && !Array.isArray(data) ? data : localConfig;
  } catch (error) {
    console.warn("Usando config local (fallback):", error);
    return localConfig;
  }
}
