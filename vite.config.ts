import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
// import devtools from 'solid-devtools/vite';
import path from "path";

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@globals": path.resolve(__dirname, "./src/globals/"),
      "@lib": path.resolve(__dirname, "./src/lib/"),
      "@utils": path.resolve(__dirname, "./@utils/"),
    },
  },
  build: {
    target: "esnext",
  },
});
