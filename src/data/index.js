import projects from "./projects.json" with { type: "json" };
import weddingProjects from "./weddings.json" with { type: "json" };
import works from "./works.json" with { type: "json" };
import services from "./services.json" with { type: "json" };
import experienceLinks from "./experiences.json" with { type: "json" };
import site from "./site.json" with { type: "json" };

const allProjects = [...projects, ...weddingProjects].map((project) => {
  const work = works.find((item) => item.slug === project.slug);
  if (!work) return project;
  const path = (file) => (work.folder ? `${work.folder}/${file}` : file);
  return {
    ...project,
    order: work.order,
    image: path(work.cover),
    assets: work.files.map(path),
  };
});

export { allProjects as projects, services, experienceLinks, site };
export const siteUrl = site.siteUrl.replace(/\/+$/, "");
export const instagram = site.contact.instagram.url;
