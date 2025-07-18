import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center w-full">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400 flex items-center justify-center gap-3">
        <SparklesIcon className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
        AI Sidekick
      </h1>
      <p className="mt-2 text-lg text-slate-400">Your Game Development Partner</p>
    </header>
  );
};

export default Header;
