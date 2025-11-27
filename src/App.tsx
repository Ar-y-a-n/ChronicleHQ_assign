import React from "react";
import { Layout } from "./components/common/Layout";
import { EditorToolbar } from "./components/editor/EditorToolbar";
import { EditorContainer } from "./components/editor/EditorContainer";

export default function App() {
  return (
    <Layout>
      {/* <EditorToolbar /> */}
      <EditorContainer />
    </Layout>
  );
}
