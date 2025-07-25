import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  //base: "/se_project_react/",//this was messing with my routing, just negated with "/" and it seems to work
  base: "/",
  plugins: [react()],
  server: {
    port: 3000,
  },
});
