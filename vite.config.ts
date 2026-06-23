import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import netlify from "@netlify/vite-plugin-tanstack-start";

// One codebase, two deploy targets:
//  - Netlify CI sets NETLIFY / NETLIFY_BUILD_BASE  -> wire Netlify output plugin.
//  - Vercel CI sets VERCEL=1 -> Nitro auto-selects the Vercel preset (.vercel/output).
// Import stays static (package is always installed); it only activates on Netlify.
const isNetlify =
  process.env.NETLIFY === "true" ||
  !!process.env.NETLIFY_BUILD_BASE ||
  !!process.env.NETLIFY_DEV;

export default defineConfig({
  plugins: [
    tanstackStart(),
    react(),
    tailwindcss(),
    tsConfigPaths(),
    ...(isNetlify ? [netlify()] : []),
  ],
});
