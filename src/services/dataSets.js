const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dje6clroh';

export const DATASETS = {
  projects: {
    key: "projects",
    baseUrl: `https://res.cloudinary.com/${cloudName}/raw/upload/projectsData_tiago.json`,
  },
  about: {
    key: "about",
    baseUrl: `https://res.cloudinary.com/${cloudName}/raw/upload/aboutMe_tiago.json`,
  },
  demos: {
    key: "demos",
    baseUrl: `https://res.cloudinary.com/${cloudName}/raw/upload/demosData_tiago.json`,
  }
};
