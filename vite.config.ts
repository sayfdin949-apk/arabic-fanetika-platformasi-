import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

// Ko'rinadigan ilova versiyasi — git qisqa SHA (support uchun: user qaysi
// versiyada ekani skrinshotdan bilinadi). git bo'lmasa "dev".
function appVersion(): string {
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "dev";
  }
}

// Build vaqtida dist/sw.js ichidagi __BUILD_ID__ ni ilova bundle'ining
// kontent-hashi (index-<hash>.js) bilan almashtiradi. Shu tufayli har
// haqiqiy o'zgarishda sw.js baytlari o'zgaradi -> brauzer yangi SW ni
// ishonchli aniqlaydi va eski keshni purge qiladi. public/ dan ko'chirilgan
// dist/sw.js ustida ishlagani uchun closeBundle da (build oxirida).
function swBuildId(): Plugin {
  return {
    name: "sw-build-id",
    apply: "build",
    closeBundle() {
      try {
        const dist = resolve(process.cwd(), "dist");
        const html = readFileSync(resolve(dist, "index.html"), "utf8");
        const m = html.match(/assets\/index-([A-Za-z0-9_-]+)\.js/);
        const buildId = m ? m[1] : String(Date.now());
        const swPath = resolve(dist, "sw.js");
        const sw = readFileSync(swPath, "utf8").replace(/__BUILD_ID__/g, buildId);
        writeFileSync(swPath, sw);
        console.log(`[sw-build-id] sw.js build ID = ${buildId}`);
      } catch (e) {
        console.warn("[sw-build-id] sw.js stamp o'tkazib yuborildi:", e);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), swBuildId()],
  define: {
    __APP_VERSION__: JSON.stringify(appVersion()),
  },
  base: "/arabic-fanetika-platformasi-/",
  server: {
    port: 5173,
    open: true,
  },
});
