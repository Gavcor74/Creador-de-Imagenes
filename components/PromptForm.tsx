
import React from 'react';
import { GenerateIcon } from './Icons';

interface PromptFormProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col h-full bg-gray-800/50 rounded-lg p-6 shadow-lg border border-gray-700">
            <label htmlFor="prompt-input" className="text-lg font-semibold mb-3 text-gray-300">
                Tu Idea Creativa
            </label>
            <textarea
                id="prompt-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej: Un astronauta montando un unicornio en el espacio, estilo Van Gogh..."
                className="flex-grow w-full p-4 bg-gray-900 border border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-gray-200 mb-4 min-h-[250px] lg:min-h-0"
                disabled={isLoading}
                rows={12}
            />
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 text-lg font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generando...
                    </>
                ) : (
                    <>
                        <GenerateIcon />
                        Generar Imagen
                    </>
                )}
            </button>
        </form>
    );
};

export default PromptForm;
