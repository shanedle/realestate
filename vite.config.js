import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default ({ mode }) => {
  import.meta.env = { ...import.meta.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [esbuildCommonjs(["react-moment"])],
      },
    },
  });
};
