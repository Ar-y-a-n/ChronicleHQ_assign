


/**
 * @vitest-environment happy-dom
 */

 




import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditorContainer } from '../src/components/editor/EditorContainer';
import { mockAiService } from '../src/services/mockAiService';

// Fix for PostCSS/Tailwind error: Mock the CSS imports so they aren't processed during tests
vi.mock('prosemirror-view/style/prosemirror.css', () => ({}));
vi.mock('../src/styles/prosemirror.css', () => ({}));

vi.mock('../src/hooks/useProseMirror', () => {
  // Create a fake div to act as the PM editor root
  const fakeDiv = document.createElement('div');
  fakeDiv.className = 'prose-editor';

  // Fake EditorView object
  const fakeView = {
    state: {},
    dispatch: () => {},
    dom: fakeDiv,
  };

  return {
    useProseMirror: () => ({
      editorRef: { current: fakeDiv },
      viewRef: { current: fakeView },   // <-- IMPORTANT!
      isReady: true,
    }),
  };
});


// Ensure ProseMirror-model and state use a single module instance
vi.mock('prosemirror-model', async () => {
  const actual = await vi.importActual<any>('prosemirror-model');
  return { ...actual, __esModule: true };
});

vi.mock('prosemirror-state', async () => {
  const actual = await vi.importActual<any>('prosemirror-state');
  return { ...actual, __esModule: true };
});


// ★ IMPORTANT: Mock ProseMirrorView to avoid real DOM API calls
vi.mock('prosemirror-view', async () => {
  const actual = await vi.importActual<any>('prosemirror-view');
  return {
    ...actual,
    __esModule: true,
    EditorView: class MockEditorView {
      state: any;
      constructor(place: any, options: any) {
        this.state = options.state;
      }
      updateState(newState: any) {
        this.state = newState;
      }
      destroy() {}
      focus() {}
    },
  };
});

vi.mock('../src/editor/commands/insertAIContent', () => ({
  insertAIContent: (_view: any, text: string) => {
    const root = document.querySelector('[class*="prose"]');
    if (root) root.textContent = text;
  }
}));



// Mock the AI service to avoid waiting 1.5s during tests
vi.mock('../src/services/mockAiService', () => ({
  mockAiService: {
    generateText: vi.fn(),
  },
}));

describe('EditorContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the editor and the continue button', () => {
    render(<EditorContainer />);
    
    expect(screen.getByText(/Chronicle Editor/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Continue Writing/i })).toBeInTheDocument();
  });

  it('shows loading state when button is clicked', async () => {
    // Setup mock to return a promise that doesn't resolve immediately
    (mockAiService.generateText as any).mockReturnValue(new Promise(() => {}));

    render(<EditorContainer />);
    
    const button = screen.getByRole('button', { name: /Continue Writing/i });
    fireEvent.click(button);

    expect(screen.getByText(/Generating.../i)).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('inserts text into the editor on success', async () => {
    // Setup mock to resolve with specific text
    const aiText = "Robot generated text";
    (mockAiService.generateText as any).mockResolvedValue(aiText);

    render(<EditorContainer />);
    
    const button = screen.getByRole('button', { name: /Continue Writing/i });
    fireEvent.click(button);

    // Wait for the text to appear in the ProseMirror editor
    // Note: ProseMirror renders text in <p> tags usually
    await waitFor(() => {
      expect(screen.getByText(aiText)).toBeInTheDocument();
    });

    // Verify button goes back to normal
    expect(screen.getByRole('button', { name: /Continue Writing/i })).toBeInTheDocument();
  });

  it('displays error message on failure', async () => {
    (mockAiService.generateText as any).mockRejectedValue(new Error("Network Error"));

    render(<EditorContainer />);
    
    const button = screen.getByRole('button', { name: /Continue Writing/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Failed to generate/i)).toBeInTheDocument();
    });
  });
});