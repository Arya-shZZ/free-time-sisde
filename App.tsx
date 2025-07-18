import React, { useState, useCallback } from 'react';
import { GameDevLevel } from './types';
import Header from './components/Header';
import LevelSelector from './components/LevelSelector';
import PromptInput from './components/PromptInput';
import ResponseDisplay from './components/ResponseDisplay';
import { generateGameDevContent } from './services/geminiService';

export default function App(): React.ReactNode {
  const [level, setLevel] = useState<GameDevLevel>(GameDevLevel.Snippet);
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    setError('');

    try {
      const result = await generateGameDevContent(prompt, level);
      setResponse(result);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(`An error occurred: ${e.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, level, isLoading]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        <Header />
        <LevelSelector currentLevel={level} onSetLevel={setLevel} />
        <PromptInput
          prompt={prompt}
          onSetPrompt={setPrompt}
          onGenerate={handleGenerate}
          isLoading={isLoading}
          level={level}
        />
        <ResponseDisplay
          response={response}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}
