import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";

export default defineConfig({
  // other configurations...
  plugins: [react()],
  optimizeDeps: {
    exclude: ["fsevents"],
  },
});
