import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { beforeEach } from "vitest";
import * as matchers from '@testing-library/jest-dom/matchers';

// Extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

beforeEach(() => {
  // ensure PM doesn’t crash due to missing selection APIs
  if (!window.getSelection) {
    (window as any).getSelection = () => ({
      removeAllRanges() {},
      addRange() {},
    });
  }
});

if (!window.getSelection) {
  (window as any).getSelection = () => ({
    removeAllRanges() {},
    addRange() {},
  });
}

if (!document.createRange) {
  (document as any).createRange = () => ({
    setStart() {},
    setEnd() {},
    commonAncestorContainer: document.body
  });
}


// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});