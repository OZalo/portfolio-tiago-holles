import { DATASETS } from "./dataSets";
import localProjects from "../data/projectsData.json";
import localConfig from "../data/siteConfig.json";

export async function fetchProjects() {
  try {
    const response = await fetch(DATASETS.projects.baseUrl);
    if (!response.ok) throw new Error("Falha ao buscar projetos");
    return await response.json();
  } catch (error) {
    console.warn("Usando projetos locais:", error);
    return localProjects;
  }
}

export async function fetchConfig() {
  try {
    const response = await fetch(DATASETS.config.baseUrl);
    if (!response.ok) throw new Error("Falha ao buscar config");
    return await response.json();
  } catch (error) {
    console.warn("Usando config local:", error);
    return localConfig;
  }
}
