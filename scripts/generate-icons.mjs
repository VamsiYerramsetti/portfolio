/*
  Generates SVG logos into /public/icons using the `simple-icons` package.
  This keeps the repo self-contained (no hotlinking icons from CDNs).

  👉 Add/remove icons by editing ICON_SLUGS.
  👉 Re-run: npm run icons
*/

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as simpleIcons from "simple-icons";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, "..", "public", "icons");
fs.mkdirSync(outDir, { recursive: true });

// Slugs follow the Simple Icons naming (e.g., siPython, siNextdotjs)
const ICON_SLUGS = [
  "siPython",
  "siDatabricks",
  "siApacheairflow",
  "siPostgresql",
  "siDocker",
  "siGit",
  "siGithub",
  "siLinkedin",
  "siSpotify",
  "siTypescript",
  "siNextdotjs",
  // NOTE: Some icons may or may not exist in the installed simple-icons version.
  // When missing, we fall back to small custom placeholders below.
  "siMicrosoftazure",
  "siOpenai",
  "siPowerbi",
  "siMicrosoftpowerautomate",
  "siTensorflow",
  "siPytorch",
  "siHuggingface",
  "siCplusplus",
  // Prefer OpenJDK for Java tooling
  "siOpenjdk",
  // LangChain isn't in Simple Icons (as of many versions). We'll include a minimal custom mark.
];

function wrapSvg(svg, hex) {
  // Force a consistent fill color that matches our theme.
  // The source SVG uses `fill="currentColor"` in many cases.
  return svg
    .replace(/<svg /, `<svg fill="${hex}" `)
    .replace(/fill="currentColor"/g, `fill="${hex}"`);
}

const themeColor = "#1b1410"; // ink

for (const key of ICON_SLUGS) {
  const icon = simpleIcons[key];
  if (!icon) {
    // Not all icons exist in all versions of simple-icons.
    // Missing ones are handled by custom placeholders below.
    continue;
  }
  const filename = `${icon.slug}.svg`;
  fs.writeFileSync(path.join(outDir, filename), wrapSvg(icon.svg, themeColor), "utf8");
}

// Add a tiny custom SVG for LangChain
const langchainSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${themeColor}">
  <path d="M7 7a3 3 0 0 1 3-3h4a3 3 0 0 1 0 6h-1v2h1a3 3 0 0 1 0 6h-4a3 3 0 0 1 0-6h1v-2H10A3 3 0 0 1 7 7zm5 3h-1v4h1v-4zm-2-4a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2h-4zm0 12a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2h-4z"/>
</svg>`;
fs.writeFileSync(path.join(outDir, "langchain.svg"), langchainSvg.trim(), "utf8");

// Add a tiny custom SVG for Email (generic envelope)
const emailSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${themeColor}">
  <path d="M6 8.5h12c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-7c0-.6.4-1 1-1zm0-2h12c1.7 0 3 1.3 3 3v7c0 1.7-1.3 3-3 3H6c-1.7 0-3-1.3-3-3v-7c0-1.7 1.3-3 3-3zm.7 3.2 5 3.3c.2.1.4.1.6 0l5-3.3c.5-.3.6-1 .3-1.4-.3-.5-1-.6-1.4-.3L12 10.9 7.4 7c-.5-.3-1.1-.2-1.4.3-.3.5-.2 1.1.3 1.4z"/>
</svg>`;
fs.writeFileSync(path.join(outDir, "email.svg"), emailSvg.trim(), "utf8");

// --- Custom placeholders (only used when an official logo isn't present) ---

const writeIfMissing = (filename, svg) => {
  const filePath = path.join(outDir, filename);
  if (fs.existsSync(filePath)) return;
  fs.writeFileSync(filePath, svg.trim(), "utf8");
};

// Azure fallback (if simple-icons does not provide it)
writeIfMissing(
  "microsoftazure.svg",
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${themeColor}">
  <path d="M8.2 18.5h8.1a3.2 3.2 0 0 0 .2-6.4 4.8 4.8 0 0 0-9.2 1.4 2.9 2.9 0 0 0 .9 5z"/>
  <path d="M12 7.5c.6 0 1 .4 1 1v5.1l1.4-1.4a1 1 0 1 1 1.4 1.4l-3.1 3.1a1 1 0 0 1-1.4 0l-3.1-3.1a1 1 0 1 1 1.4-1.4l1.4 1.4V8.5c0-.6.4-1 1-1z"/>
</svg>`
);

// Power BI fallback
writeIfMissing(
  "powerbi.svg",
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${themeColor}">
  <path d="M6.5 19.5c-.8 0-1.5-.7-1.5-1.5V9c0-.8.7-1.5 1.5-1.5h2c.8 0 1.5.7 1.5 1.5v9c0 .8-.7 1.5-1.5 1.5h-2zm7 0c-.8 0-1.5-.7-1.5-1.5V6.5c0-.8.7-1.5 1.5-1.5h2c.8 0 1.5.7 1.5 1.5V18c0 .8-.7 1.5-1.5 1.5h-2zm7 0c-.8 0-1.5-.7-1.5-1.5V11c0-.8.7-1.5 1.5-1.5h.5c.8 0 1.5.7 1.5 1.5v7c0 .8-.7 1.5-1.5 1.5h-.5z"/>
</svg>`
);

// Power Automate fallback
writeIfMissing(
  "microsoftpowerautomate.svg",
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${themeColor}">
  <path d="M8 6.5a2 2 0 0 1 2-2h3.2a2 2 0 0 1 1.5.7l4.7 5.4a2 2 0 0 1 0 2.6l-4.7 5.4a2 2 0 0 1-1.5.7H10a2 2 0 0 1-2-2v-11z"/>
  <path d="M4.5 10.5a1 1 0 0 1 1-1H9v5H5.5a1 1 0 0 1-1-1v-3z"/>
</svg>`
);

// Concept / non-brand placeholders
writeIfMissing(
  "cicd.svg",
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${themeColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M7 7h10v10H7z"/>
  <path d="M9 9h6"/>
  <path d="M9 12h4"/>
  <path d="M9 15h5"/>
  <path d="M4 12a8 8 0 0 1 8-8"/>
  <path d="M20 12a8 8 0 0 1-8 8"/>
</svg>`
);

writeIfMissing(
  "rags.svg",
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${themeColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M7 4h8l2 2v14H7z"/>
  <path d="M15 4v4h4"/>
  <path d="M9 10h6"/>
  <path d="M9 13h6"/>
  <path d="M9 16h4"/>
</svg>`
);

writeIfMissing(
  "chromadb.svg",
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${themeColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="6" rx="7" ry="2.8"/>
  <path d="M5 6v6c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8V6"/>
  <path d="M5 12v6c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8v-6"/>
</svg>`
);

writeIfMissing(
  "azuredatafactory.svg",
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${themeColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 20V10l8-4 8 4v10"/>
  <path d="M8 20v-6h8v6"/>
  <path d="M10 10h.01"/>
  <path d="M14 10h.01"/>
</svg>`
);

writeIfMissing(
  "azureopenai.svg",
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${themeColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3.5l7 4v9l-7 4-7-4v-9l7-4z"/>
  <path d="M8.5 12h7"/>
  <path d="M12 8.5v7"/>
</svg>`
);

writeIfMissing(
  "datamining.svg",
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${themeColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 20h16"/>
  <path d="M7 18l4-8 6 4-2 4"/>
  <path d="M10.5 10.5l2-4"/>
</svg>`
);

writeIfMissing(
  "bigdata.svg",
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${themeColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="6" rx="7" ry="2.8"/>
  <path d="M5 6v6c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8V6"/>
  <path d="M8 12h.01"/>
  <path d="M12 12h.01"/>
  <path d="M16 12h.01"/>
</svg>`
);

writeIfMissing(
  "langfuse.svg",
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${themeColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 7h7"/>
  <path d="M6 12h10"/>
  <path d="M6 17h6"/>
  <path d="M17.5 7.5l2 2-4.5 4.5-2.5.5.5-2.5 4.5-4.5z"/>
</svg>`
);

console.log(`Icons generated in: ${outDir}`);
