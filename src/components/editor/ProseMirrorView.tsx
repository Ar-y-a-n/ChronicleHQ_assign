import React, { useEffect } from 'react';
import { useProseMirror } from '../../hooks/useProseMirror';
import { EditorView } from 'prosemirror-view';
import { cn } from "../../utils/cn";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";



interface Props {
  onViewReady?: (view: EditorView) => void;
  className?: string;
  placeholder?: string;
}

export const ProseMirrorView: React.FC<Props> = ({
  onViewReady,
  className,
  placeholder = "Start typing..."
}) => {
  const { editorRef, viewRef, isReady } = useProseMirror();

  useEffect(() => {
    if (isReady && viewRef.current && onViewReady) {
      onViewReady(viewRef.current);
    }
  }, [isReady, onViewReady]);

  return (
    <div
      ref={editorRef}
      className={cn(
        "prose-editor bg-black/40 backdrop-blur-sm rounded-md border border-white/10 shadow-soft overflow-auto",
        "min-h-[420px] max-h-[65vh] p-4 text-white",
        className
      )}
      data-placeholder={placeholder}
    />
  );
};
