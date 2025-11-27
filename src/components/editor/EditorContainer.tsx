import React, { useEffect, useRef,useState } from "react";
import { EditorView } from "prosemirror-view";
import { useEditorMachine } from "../../hooks/useEditorMachine";
import { ProseMirrorView } from "./ProseMirrorView";
import { insertAIContent } from "../../editor/commands/insertAIContent";
import { Button } from "../common/Button";

export const EditorContainer: React.FC = () => {
  const { send, isLoading, isSuccess, isError, generatedText } =
    useEditorMachine();

  const viewRef = useRef<EditorView | null>(null);

  const handleViewReady = (view: EditorView) => {
    viewRef.current = view;
  };

const [validationError, setValidationError] = useState("");

const handleGenerateClick = () => {
  const currentText = viewRef.current?.state.doc.textContent.trim();

  if (!currentText) {
    setValidationError("Please write something");
    return;
  }

  setValidationError("");
  send({ type: "GENERATE", currentText });
};

  useEffect(() => {
    if (isSuccess && generatedText && viewRef.current) {
      insertAIContent(viewRef.current, generatedText);
      send({ type: "TEXT_INSERTED" });
    }
  }, [isSuccess, generatedText, send]);

  // Status logic WITHOUT statusText
 let message = "";
if (validationError) message = validationError;
else if (isLoading) message = "Writing…";
else if (isError) message = "Failed to write";
else if (isSuccess) message = "Done!";


  return (
    <div className="flex flex-col h-full w-full px-6 py-6">
      <div
        className="flex-1 editor-panel rounded-2xl p-6"
        onClick={() => viewRef.current?.focus()}
      >
        {/* ProseMirror editor */}
        <div className="flex-1 overflow-y-auto">
          <ProseMirrorView onViewReady={handleViewReady} />
        </div>

        {/* bottom-left status pill */}
        <div className="panel-status">
          {message && <div className="status-pill">{message}</div>}
        </div>

        {/* bottom-right glowing morphing button */}
        <div className="panel-action">
          <Button onClick={handleGenerateClick} isLoading={isLoading}>
            Continue Writing
          </Button>
        </div>
      </div>
    </div>
  );
};
