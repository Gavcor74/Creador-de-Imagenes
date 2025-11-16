
import React, { useState, useCallback } from 'react';
import { generateImage } from './services/geminiService';
import PromptForm from './components/PromptForm';
import ImageDisplay from './components/ImageDisplay';
import ErrorAlert from './components/ErrorAlert';
import { GithubIcon, SparklesIcon } from './components/Icons';

const initialPrompt = `Crea una imagen de meme dividida en dos.
A la izquierda: una foto en blanco y negro de un aula tradicional y aburrida. En esta sección, superpón el texto '10 AÑOS ESTUDIANDO' en letras blancas mayúsculas.
A la derecha: una foto vibrante y a todo color de un hombre carismático con apariencia de Jesús en un entorno moderno y cotidiano, como una cafetería o una calle de la ciudad. Debe estar sonriendo con confianza.
Cruzando el centro de ambas imágenes, un texto principal en letras grandes, rojas y llamativas que diga: '¡Y NO HABLAS!'.
Debajo del texto principal, en una fuente más pequeña y discreta, añade el subtítulo: 'Te explico por qué'.
El estilo general debe ser impactante y humorístico, típico de un meme viral.`;

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>(initialPrompt);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateImage = useCallback(async (event?: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }
        if (!prompt.trim()) {
            setError('El prompt no puede estar vacío.');
            return;
        }
        
        setIsLoading(true);
        setError(null);
        setImageUrl(null);

        try {
            const url = await generateImage(prompt);
            setImageUrl(url);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <main className="w-full max-w-6xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 inline-flex items-center gap-3">
                        <SparklesIcon />
                        Generador de Imágenes
                    </h1>
                    <p className="mt-2 text-lg text-gray-400">
                        Describe una idea y la convertiremos en una imagen con la magia de Gemini.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
                        <PromptForm
                            prompt={prompt}
                            setPrompt={setPrompt}
                            onSubmit={handleGenerateImage}
                            isLoading={isLoading}
                        />
                    </div>

                    <div className="lg:row-start-1 lg:col-start-2">
                         <ImageDisplay imageUrl={imageUrl} isLoading={isLoading} />
                    </div>
                </div>
            </main>
            <footer className="w-full max-w-6xl mx-auto mt-12 text-center text-gray-500">
                <p>Creado con React, Tailwind CSS y la API de Google Gemini.</p>
                <a href="https://github.com/google/generative-ai-docs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-purple-400 transition-colors mt-2">
                    <GithubIcon />
                    <span>Ver en GitHub</span>
                </a>
            </footer>
        </div>
    );
};

export default App;
