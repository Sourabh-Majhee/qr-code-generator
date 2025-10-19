import React from 'react';
import { ZapIcon } from './icons/ZapIcon';

interface InputFormProps {
  text: string;
  setText: (text: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ text, setText, onGenerate, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onGenerate();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., https://google.com"
        className="flex-grow w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-300 bg-white/50"
        disabled={isLoading}
        aria-label="Text or URL to encode"
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !text}
        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>Generate</span>
            <ZapIcon className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
};

export default InputForm;
