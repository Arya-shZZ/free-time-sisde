import React from 'react';
import { GameDevLevel } from '../types';
import SparklesIcon from './icons/SparklesIcon';

interface PromptInputProps {
  prompt: string;
  onSetPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  level: GameDevLevel;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, onSetPrompt, onGenerate, isLoading, level }) => {
  const placeholderText = level === GameDevLevel.Snippet
    ? "e.g., player jump in Unity with C#"
    : "e.g., a simple inventory system for an RPG";

  return (
    <div className="w-full flex flex-col gap-4">
      <textarea
        value={prompt}
        onChange={(e) => onSetPrompt(e.target.value)}
        placeholder={placeholderText}
        className="w-full h-32 p-4 bg-slate-800 border border-slate-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-200 font-mono placeholder-slate-500 transition-shadow"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !prompt.trim()}
        className="flex items-center justify-center gap-2 w-full sm:w-auto self-end px-6 py-3 bg-cyan-500 text-slate-900 font-bold rounded-lg hover:bg-cyan-400 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-cyan-500/20 disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Generate
          </>
        )}
      </button>
    </div>
  );
};

export default PromptInput;
