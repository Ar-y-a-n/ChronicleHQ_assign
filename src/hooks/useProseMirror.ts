import { useEffect, useRef, useState } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from '../editor/config/schema';


import 'prosemirror-view/style/prosemirror.css'; // Default PM styles if available
import '../styles/prosemirror.css'; // Our custom overrides

interface UseProseMirrorProps {
  initialContent?: string; // Optional: if we wanted to load saved text
}

export const useProseMirror = ({ initialContent = '' }: UseProseMirrorProps = {}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  
  // We use state to track if the view is ready, 
  // so the parent component knows when it's safe to interact with it.
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;

    // 1. Initialize State
    // We create a simple empty doc with our schema
    const state = EditorState.create({
      schema,
      
    });

    // 2. Initialize View
    // We mount it to the div referenced by editorRef
    const view = new EditorView(editorRef.current, {
  state,
  dispatchTransaction(transaction) {
    if (!viewRef.current) return;

    const newState = viewRef.current.state.apply(transaction);
    viewRef.current.updateState(newState);
  },
});

viewRef.current = view;
    setIsReady(true);

    // 3. Cleanup on unmount
    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  return {
    editorRef, // Attach this to the DOM <div>
    viewRef,   // Use this to access the PM instance (for inserting AI text)
    isReady,
  };
};