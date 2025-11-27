import { useMachine } from '@xstate/react';
import { aiEditorMachine } from '../machines/aiEditorMachine';

export const useEditorMachine = () => {
  const [state, send] = useMachine(aiEditorMachine);

  return {
    state,
    send,
    // Helper accessors to keep the component clean
    isIdle: state.matches('idle'),
    isLoading: state.matches('loading'),
    isSuccess: state.matches('success'),
    isError: state.matches('error'),
    generatedText: state.context.generatedText,
  };
};