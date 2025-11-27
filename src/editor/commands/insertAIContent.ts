import { EditorView } from 'prosemirror-view';

/**
 * Inserts generated text into the editor at the current cursor position.
 * * @param view - The ProseMirror EditorView instance
 * @param text - The text content returned by the AI
 */
export const insertAIContent = (view: EditorView, text: string) => {
  const { state, dispatch } = view;
  
  // 1. Create a transaction
  const tr = state.tr;
  
  // 2. Insert the text at the current selection cursor
  // "insertText" handles replacing the selection if text is highlighted
  tr.insertText(text);
  
  // 3. Ensure the cursor moves to the end of the inserted text 
  // and scrolls the view so the user sees the new content.
  tr.scrollIntoView();
  
  // 4. Dispatch the transaction to apply the update
  dispatch(tr);
};