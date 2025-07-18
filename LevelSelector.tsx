import React from 'react';
import { GameDevLevel } from '../types';
import CodeIcon from './icons/CodeIcon';
import ArchitectureIcon from './icons/ArchitectureIcon';

interface LevelSelectorProps {
  currentLevel: GameDevLevel;
  onSetLevel: (level: GameDevLevel) => void;
}

const LevelButton: React.FC<{
  label: string;
  description: string;
  Icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, description, Icon, isActive, onClick }) => {
  const baseClasses = "flex-1 p-4 rounded-lg border-2 text-left transition-all duration-300 transform hover:-translate-y-1";
  const activeClasses = "bg-slate-700/50 border-cyan-400 shadow-lg shadow-cyan-500/10";
  const inactiveClasses = "bg-slate-800 border-slate-700 hover:border-slate-500";
  
  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      <div className="flex items-center gap-4">
        <Icon className={`w-8 h-8 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
        <div>
          <h3 className="text-lg font-bold text-slate-100">{label}</h3>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </div>
    </button>
  );
};

const LevelSelector: React.FC<LevelSelectorProps> = ({ currentLevel, onSetLevel }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <LevelButton
        label="Quick Snippet"
        description="Generate focused code for a specific mechanic."
        Icon={CodeIcon}
        isActive={currentLevel === GameDevLevel.Snippet}
        onClick={() => onSetLevel(GameDevLevel.Snippet)}
      />
      <LevelButton
        label="Concept Architect"
        description="Design a high-level system or feature."
        Icon={ArchitectureIcon}
        isActive={currentLevel === GameDevLevel.Architecture}
        onClick={() => onSetLevel(GameDevLevel.Architecture)}
      />
    </div>
  );
};

export default LevelSelector;
