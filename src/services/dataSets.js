const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dje6clroh';

export const DATASETS = {
  projects: {
    key: "projects",
    baseUrl: `https://res.cloudinary.com/${cloudName}/raw/upload/projectsData_tiago.json`,
  },
  config: {
    key: "config",
    baseUrl: `https://res.cloudinary.com/${cloudName}/raw/upload/siteConfig_tiago.json`,
  },
  demos: {
    key: "demos",
    baseUrl: `https://res.cloudinary.com/${cloudName}/raw/upload/demosData_tiago.json`,
  }
};
