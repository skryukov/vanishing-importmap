import { defineConfig } from "vite";
import jsbundling from "rails-vite-plugin/jsbundling";

export default defineConfig({
  plugins: [
    jsbundling(),
  ],
});
