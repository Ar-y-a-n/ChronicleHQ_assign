import React from "react";

export const EditorToolbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-white font-semibold">
          AI
        </div>
        <h1 className="text-xl font-semibold text-white tracking-tight">
          AI Editor
        </h1>
      </div>
    </div>
  );
};
