import { describe, it, expect, vi, afterEach } from 'vitest';
import { createActor } from 'xstate';
import { aiEditorMachine } from '../src/machines/aiEditorMachine';
import { mockAiService } from '../src/services/mockAiService';

// Explicitly mock the module structure
vi.mock('../src/services/mockAiService', () => ({
  mockAiService: {
    generateText: vi.fn(),
  },
}));

describe('AI Editor Machine', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should start in the idle state', () => {
    const actor = createActor(aiEditorMachine).start();
    expect(actor.getSnapshot().value).toBe('idle');
  });

  it('should transition to loading when GENERATE is sent', () => {
    const actor = createActor(aiEditorMachine).start();
    actor.send({ type: 'GENERATE' });
    expect(actor.getSnapshot().value).toBe('loading');
  });

  it('should transition to success when the service resolves', async () => {
    // 1. Setup the mock response
    vi.mocked(mockAiService.generateText).mockResolvedValue('Mocked AI Text');

    // 2. Start machine and trigger
    const actor = createActor(aiEditorMachine).start();
    actor.send({ type: 'GENERATE' });

    // 3. Wait for success state
    await new Promise<void>(resolve => {
        const sub = actor.subscribe(snapshot => {
            if (snapshot.value === 'success') {
                sub.unsubscribe();
                resolve();
            }
        });
    });

    const snapshot = actor.getSnapshot();
    expect(snapshot.value).toBe('success');
    expect(snapshot.context.generatedText).toBe('Mocked AI Text');
  });

  it('should transition to error when the service fails', async () => {
    // 1. Setup the mock error
    vi.mocked(mockAiService.generateText).mockRejectedValue(new Error('API Failure'));

    const actor = createActor(aiEditorMachine).start();
    actor.send({ type: 'GENERATE' });

    await new Promise<void>(resolve => {
        const sub = actor.subscribe(snapshot => {
            if (snapshot.value === 'error') {
                sub.unsubscribe();
                resolve();
            }
        });
    });

    const snapshot = actor.getSnapshot();
    expect(snapshot.value).toBe('error');
    expect(snapshot.context.errorMessage).toBe('API Failure');
  });
});