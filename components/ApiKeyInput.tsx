import React, { useState } from 'react';
import { Button } from './Button';
import { KeyIcon } from './icons/KeyIcon';

interface ApiKeyInputProps {
  onSubmit: (apiKey: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
            Welcome
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Please enter your Google Gemini API Key to continue.
          </p>
        </header>

        <main className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="api-key" className="block text-sm font-medium text-gray-300 mb-2">
                Gemini API Key
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <KeyIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="block w-full rounded-md border-0 bg-white/5 py-2 pl-10 pr-4 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your API key"
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={!apiKey.trim()} className="w-full">
              Save & Continue
            </Button>
          </form>
        </main>
         <footer className="text-center mt-8 text-gray-500 text-sm">
            <p>Your API key is stored only in your browser for this session.</p>
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Get a Gemini API Key
            </a>
        </footer>
      </div>
    </div>
  );
};