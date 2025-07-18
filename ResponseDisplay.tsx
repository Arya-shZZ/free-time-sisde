import React, { useState, useEffect } from 'react';

interface ResponseDisplayProps {
  response: string;
  isLoading: boolean;
  error: string;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-4 bg-slate-700 rounded w-3/4"></div>
    <div className="h-4 bg-slate-700 rounded w-full"></div>
    <div className="h-4 bg-slate-700 rounded w-5/6"></div>
    <div className="h-20 bg-slate-800 rounded mt-4"></div>
     <div className="h-4 bg-slate-700 rounded w-full"></div>
  </div>
);

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const cleanCode = code.replace(/^```(\w*\n)?/, '').replace(/```$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 rounded-lg my-4 relative border border-slate-700">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded hover:bg-slate-600 transition-colors"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="p-4 overflow-x-auto text-sm text-slate-200 font-mono">
        <code>{cleanCode}</code>
      </pre>
    </div>
  );
};

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, isLoading, error }) => {
  const [displayResponse, setDisplayResponse] = useState('');

  useEffect(() => {
    if (isLoading) {
      setDisplayResponse('');
      return;
    }
    
    if (response) {
      setDisplayResponse('');
      let currentText = '';
      let i = 0;
      const interval = setInterval(() => {
        if (i < response.length) {
          currentText += response[i];
          setDisplayResponse(currentText);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 10);

      return () => clearInterval(interval);
    }
  }, [response, isLoading]);


  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return <p className="text-red-400 bg-red-900/20 p-4 rounded-lg border border-red-500/50">{error}</p>;
    }
    if (!displayResponse) {
      return <p className="text-slate-500 text-center py-10">Your AI-generated content will appear here.</p>;
    }
    
    const parts = displayResponse.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        return <CodeBlock key={index} code={part} />;
      }
      return (
        <p key={index} className="whitespace-pre-wrap leading-relaxed">
          {part}
        </p>
      );
    });
  };

  return (
    <div className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-6 min-h-[200px] shadow-inner">
      {renderContent()}
    </div>
  );
};

export default ResponseDisplay;
