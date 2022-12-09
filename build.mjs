import fs from "fs";
import { Parcel } from "@parcel/core";

if (fs.existsSync(`./dist`)) {
  fs.rmSync(`./dist`, { recursive: true });
}

fs.mkdirSync(`./dist`);

// Attempt to define multiple target inputs to avoid running Parcel twice
// https://parceljs.org/features/targets/#source

const bundler = new Parcel({
  // entries: `a.ts`, // Can we use targets.someTarget.source without defining entries?
  defaultConfig: "@parcel/config-default",
  mode: `production`,
  targets: {
    root: {
      source: `a.ts`, // Do we need a source field in package.json to use this?
      sourceMap: false,
      outputFormat: `commonjs`,
      includeNodeModules: false,
      distDir: `dist`,
    },
  },
});

await bundler.run();

console.info({ success: fs.existsSync(`./dist/a.js`) });
