# 📝 Chronicle AI Editor  
*A specialized AI-assisted text editor built with React, ProseMirror, and XState — powered by the Gemini 2.0 Flash model.*

---

## 🚀 Overview

The **Chronicle AI Editor** is a frontend application that bridges the gap between **imperative text-editing engines** and **declarative state management**.  
It provides an intelligent **Continue Writing** feature that analyzes the user’s current writing context and generates a natural continuation.

### 🔑 Key Features
- **Rich Text Editing** – Full control through the ProseMirror engine.  
- **Deterministic State Logic** – All UI logic (loading, error, success) handled via XState.  
- **AI Integration** – Real-time continuation using the Gemini 2.0 Flash model.  
- **Robust Architecture** – Clear separation between UI (React), logic (XState), and editor state (ProseMirror).

---

## 🏗️ Architecture & Design Decisions

This project follows strict separation of concerns to ensure **maintainability**, **testability**, and **predictability**.

---

### 1. State Management — **Why XState?**

Instead of tracking fragmented UI booleans (isLoading, error) across React components, the editor uses a **Finite State Machine (FSM)**.

#### Benefits:
- **Predictability**: Cannot trigger a second AI request while one is already in progress.  
  - *(idle → loading → success/error)*  
- **Clean Error Handling**: Retries and resets are explicit transitions.  
- **Visualizable Logic**: State logic is decoupled from the UI.  
- **Testability**: The FSM is easily unit-testable.

📁 *See:* `src/machines/aiEditorMachine.ts`

---

### 2. Editor Engine — **Why ProseMirror?**

ProseMirror offers a **transaction-based** system that is far more robust than a textarea.

#### Advantages:
- Each text update is a **transaction**, maintaining:
  - Undo/redo history  
  - Proper selection & cursor position  
- Custom commands allow structured editing operations.

The editor is controlled via a custom hook:

📁 `src/hooks/useProseMirror.ts`  
🛠️ Command example:  
- `insertAIContent` – inserts generated text with full transaction support.

---

### 3. AI Service Layer

The app communicates with the **Gemini 2.0 Flash** model.

#### Prompt Engineering Choices:
- Designed as an **Autocomplete Engine**  
- Prevents:
  - Repetition  
  - Over-long responses  
  - Style inconsistencies  
- Produces natural, context-aware continuation.

📁 Implementation: `src/services/geminiService.ts`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Vite** | Fast dev server & bundler |
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **XState v5** | AI request state machine |
| **ProseMirror** | Rich-text editing engine |
| **Tailwind CSS** | Utility-based styling |
| **Vitest** | Unit testing |

---

## 💻 Getting Started

### **Prerequisites**
- Node.js (v18+)
- npm or yarn
- Google Gemini API key

---

### **Installation**

```bash
git clone https://github.com/yourusername/chronicle-ai-editor.git
cd chronicle-ai-editor
npm install
