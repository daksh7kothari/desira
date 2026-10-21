import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/experiences.css";
import "./styles/editorial.css";
import "./styles/brand-bits.css";
import "./styles/site.css";
import "./styles/navigation.css";
import App from "./App.jsx";
import "./styles/minimal.css";
import "./styles/interactions.css";
import "./styles/home-motion.css";
import "./styles/scroll-story.css";
import "./styles/wedding-story.css";
import "./styles/production-polish.css";

const root = document.getElementById("root");
const app = (
  <StrictMode>
    <App pathname={window.location.pathname} />
  </StrictMode>
);

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
