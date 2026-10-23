import { useEffect } from "react";
import getPage from "./lib/getPage.js";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import PageMotion from "./components/motion/PageMotion.jsx";
import HomePage from "./pages/HomePage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import ExperienceGalleryPage from "./pages/ExperienceGalleryPage.jsx";
import DesignDeskPage from "./pages/DesignDeskPage.jsx";
import DesignNotePage from "./pages/DesignNotePage.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App({ pathname = "/" }) {
  const page = getPage(pathname);
  useEffect(() => {
    document.title = page.title;
    const description = document.querySelector("meta[name=description]");
    if (description) description.content = page.description;
  }, [page.title, page.description]);
  useEffect(() => {
    const root = document.getElementById("site-content");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const watch = (image) => {
      if (!(image instanceof HTMLImageElement) || image.complete || image.dataset.refineLoading !== undefined || /(?:\.svg|logo\.)/i.test(image.src)) return;
      image.dataset.refineLoading = "";
      const done = () => {
        delete image.dataset.refineLoading;
        image.removeEventListener("load", done);
        image.removeEventListener("error", done);
        if (image.naturalWidth && !reducedMotion) {
          image.animate([{ filter: "blur(14px)" }, { filter: "blur(0)" }], {
            duration: 480,
            easing: "steps(5, end)",
          });
        }
      };
      image.addEventListener("load", done);
      image.addEventListener("error", done);
    };
    const scan = (node) => {
      watch(node);
      node.querySelectorAll?.("img").forEach(watch);
    };
    scan(root);
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === "attributes") scan(record.target);
        else record.addedNodes.forEach(scan);
      });
    });
    observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["src", "srcset"] });
    return () => observer.disconnect();
  }, []);
  let content;
  if (page.project) content = <ProjectPage project={page.project} />;
  else if (page.service) content = <ServicePage service={page.service} />;
  else if (page.note) content = <DesignNotePage note={page.note} />;
  else if (page.kind === "work") content = <WorkPage />;
  else if (page.kind === "studio") content = <AboutPage />;
  else if (page.kind === "contact") content = <ContactPage />;
  else if (page.kind === "experiences") content = <ExperienceGalleryPage />;
  else if (page.kind === "desk") content = <DesignDeskPage />;
  else if (page.kind === "notes" || page.kind === "sketchbook")
    content = <CollectionPage kind={page.kind} />;
  else if (page.notFound) content = <NotFoundPage />;
  else content = <HomePage />;

  return (
    <>
      <div id="site-content">
        <PageMotion pathname={pathname} />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header isHome={page.kind === "home"} />
        <div id="main-content" tabIndex={-1}>
          {content}
        </div>
        <Footer isHome={page.kind === "home"} />
      </div>
    </>
  );
}
