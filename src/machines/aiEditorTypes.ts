export interface AiEditorContext {
  generatedText: string | null;
  errorMessage: string | null;
  sourceText: string; // 👈 Add this line (The text we send to AI)
}

export type AiEditorEvent =
  | { type: 'GENERATE'; currentText: string }
  | { type: 'RETRY' }
  | { type: 'DISCARD_ERROR' }
  | { type: 'TEXT_INSERTED' };