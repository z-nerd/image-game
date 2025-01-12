import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
  define: {
    Module: {}, // this
  },
  build: {
    rollupOptions: {
      // output: {
      //   manualChunks: {
      //     opencv: ["opencv-ts"],
      //   },
      // },
      external: [path.resolve(__dirname, "./public/opencv.js")],
    },
  },
});
