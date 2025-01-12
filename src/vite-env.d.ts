/// <reference types="vite/client" />

type CV = typeof import("mirada/dist/src/types/opencv/_types");

declare global {
  interface Window {
    cv: Promise<CV>;
  }
}
