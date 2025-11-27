import { setup, fromPromise, assign } from 'xstate';
import { AiEditorContext, AiEditorEvent } from './aiEditorTypes';
import { geminiService } from '../services/geminiService';

export const aiEditorMachine = setup({
  types: {
    context: {} as AiEditorContext,
    events: {} as AiEditorEvent,
  },
  
  // ✅ FIX 1: Define the logic here (Typed Actor)
  actors: {
    fetchAiContent: fromPromise(async ({ input }: { input: { text: string } }) => {
      if (!input.text) throw new Error("No text provided");
      return await geminiService.generateText(input.text);
    }),
  },

  actions: {
    saveSourceText: assign({
      sourceText: ({ event }) => {
        if (event.type === 'GENERATE') {
          return event.currentText;
        }
        return '';
      }
    }),
    clearContext: assign({
      generatedText: null,
      errorMessage: null,
      sourceText: ''
    }),
    assignContent: assign({
      generatedText: ({ event }) => (event as any).output,
      errorMessage: null,
    }),
    assignError: assign({
      errorMessage: ({ event }) => (event as any).error.message || 'Unknown error',
      generatedText: null,
    }),
  },
}).createMachine({
  id: 'aiEditor',
  initial: 'idle',
  context: {
    generatedText: null,
    errorMessage: null,
    sourceText: '',
  },
  states: {
    idle: {
      on: {
        GENERATE: { 
          target: 'loading',
          actions: 'saveSourceText' 
        },
      },
    },
    loading: {
      invoke: {
        // ✅ FIX 2: Refer to the actor by name (No complex inline logic)
        id: 'generateContent',
        src: 'fetchAiContent',
        
        // ✅ FIX 3: Pass input cleanly (TypeScript now knows 'context' is AiEditorContext)
        input: ({ context }) => ({ 
          text: context.sourceText 
        }),
        
        onDone: {
          target: 'success',
          actions: 'assignContent',
        },
        onError: {
          target: 'error',
          actions: 'assignError',
        },
      },
    },
    success: {
      on: {
        TEXT_INSERTED: { 
          target: 'idle', 
          actions: 'clearContext' 
        },
      },
    },
    error: {
      on: {
        GENERATE: { target: 'loading', actions: 'saveSourceText' }, 
        RETRY: { target: 'loading' }, 
        DISCARD_ERROR: { 
          target: 'idle', 
          actions: 'clearContext' 
        },
      },
    },
  },
});