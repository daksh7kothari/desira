import { projects, services } from "../data/index.js";
import metadata from "../data/metadata.json" with { type: "json" };
import notes from "../data/notes.json" with { type: "json" };

export default function getPage(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (metadata[path]) return metadata[path];
  const project = projects.find((item) => path === `/work/${item.slug}`);
  const service = services.find((item) => path === `/services/${item.slug}`);
  const note = notes.find((item) => path === `/notes/${item.slug}`);
  if (project)
    return {
      title: `${project.title} | Desira`,
      description: project.description,
      image: project.image,
      noindex: !!project.sample,
      project,
    };
  if (service)
    return {
      title: `${service.title} in Chennai | Desira`,
      description: service.description,
      image: service.image,
      service,
    };
  if (note)
    return {
      title: `${note.title} | Desira`,
      description: note.excerpt,
      image: note.image,
      noindex: !!note.sample,
      note,
    };
  return {
    title: "Page not found | Desira",
    description: "Explore graphic design by Desira.",
    notFound: true,
    noindex: true,
  };
}
