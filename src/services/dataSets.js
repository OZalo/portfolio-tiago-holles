const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

export const DATASETS = {
  projects: {
    key: "projects",
    baseUrl: `https://res.cloudinary.com/${cloudName}/raw/upload/projectsData_tiago.json`,
  },
  config: {
    key: "config",
    baseUrl: `https://res.cloudinary.com/${cloudName}/raw/upload/siteConfig_tiago.json`,
  }
};
