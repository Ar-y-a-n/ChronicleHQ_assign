import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  css: { postcss: { plugins: [] } },

  test: {
  globals: true,
  environment: "happy-dom",
  setupFiles: ["./tests/setup.ts"],

  css: false,

  server: {
    deps: {
      inline: [
        /prosemirror/,
        "prosemirror-view",
        "prosemirror-model",
        "prosemirror-state",
        "prosemirror-transform",
        "prosemirror-schema-basic",
      ],
    },
  },
},
  resolve: {
    alias: {
      "prosemirror-view/style/prosemirror.css": path.resolve(
        __dirname,
        "tests/css-empty.css"
      ),
    },
  },
});
