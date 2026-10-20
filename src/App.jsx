import { useEffect, useState } from "react";
import { site, siteUrl, instagram } from "./data/index.js";
import getPage from "./lib/getPage.js";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import EnquiryDialog from "./components/forms/EnquiryDialog.jsx";
import PageMotion from "./components/motion/PageMotion.jsx";
import OpeningIntro from "./components/motion/OpeningIntro.jsx";
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
  const [enquiry, setEnquiry] = useState(null);
  const page = getPage(pathname);
  useEffect(() => {
    document.title = page.title;
    const description = document.querySelector("meta[name=description]");
    if (description) description.content = page.description;
  }, [page.title, page.description]);
  const onEnquire = (service = "") => setEnquiry({ service });
  let content;
  if (page.project)
    content = <ProjectPage project={page.project} onEnquire={onEnquire} />;
  else if (page.service)
    content = <ServicePage service={page.service} onEnquire={onEnquire} />;
  else if (page.note) content = <DesignNotePage note={page.note} />;
  else if (page.kind === "work") content = <WorkPage />;
  else if (page.kind === "studio")
    content = <AboutPage onEnquire={onEnquire} />;
  else if (page.kind === "contact") content = <ContactPage />;
  else if (page.kind === "experiences") content = <ExperienceGalleryPage />;
  else if (page.kind === "desk") content = <DesignDeskPage />;
  else if (page.kind === "notes" || page.kind === "sketchbook")
    content = <CollectionPage kind={page.kind} />;
  else if (page.notFound) content = <NotFoundPage />;
  else content = <HomePage />;

  return (
    <>
      <OpeningIntro isHome={page.kind === "home"} />
      <div id="site-content">
        <PageMotion pathname={pathname} />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header onEnquire={onEnquire} isHome={page.kind === "home"} />
        <div id="main-content" tabIndex={-1}>
          {content}
        </div>
        <Footer onEnquire={onEnquire} isHome={page.kind === "home"} />
        {enquiry && (
          <EnquiryDialog
            service={enquiry.service}
            onClose={() => setEnquiry(null)}
          />
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: siteUrl,
            logo: `${siteUrl}${site.assets.logo.src}`,
            description: site.description,
            sameAs: [instagram],
          }).replaceAll("<", "\\u003c"),
        }}
      />
    </>
  );
}
