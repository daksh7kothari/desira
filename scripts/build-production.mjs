import { spawnSync } from "node:child_process";
import { isPublicSite, publicSiteUrl } from "./seo-config.mjs";

if (!isPublicSite) {
  console.error("Production build requires SITE_URL=https://desiraft.com in the environment or .env.local.");
  process.exit(1);
}

const command = process.platform === "win32" ? "cmd.exe" : "npm";
const args = process.platform === "win32" ? ["/d", "/s", "/c", "npm run build"] : ["run", "build"];
const build = spawnSync(command, args, { stdio: "inherit" });
if (build.error) {
  console.error(`Unable to start build command: ${build.error.message}`);
  process.exit(1);
}
if (build.status !== 0) process.exit(build.status ?? 1);
const check = spawnSync(process.execPath, ["scripts/validate-seo.mjs"], { stdio: "inherit" });
if (check.error) {
  console.error(`Unable to run SEO validation: ${check.error.message}`);
  process.exit(1);
}
if (check.status !== 0) process.exit(check.status ?? 1);
console.log(`Production SEO build verified for ${publicSiteUrl}.`);
