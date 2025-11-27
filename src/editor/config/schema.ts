import { Schema } from 'prosemirror-model';

// The schema defines the structure of the document.
// Nodes are the structural blocks (paragraphs, headings).
// Marks are inline styles (bold, italic - kept minimal for this task).
export const schema = new Schema({
  nodes: {
    // The top-level document node
    doc: {
      content: 'block+',
    },
    // A standard paragraph block
    paragraph: {
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM() {
        return ['p', 0];
      },
    },
    // The text content itself
    text: {
      group: 'inline',
    },
  },
  marks: {
    // We can add bold/italic here later if needed, 
    // but for now we keep it empty to strictly meet requirements.
  },
});