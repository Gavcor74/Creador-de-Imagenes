
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/png;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No se pudo generar la imagen. La respuesta de la API estaba vacía.");
        }
    } catch (error) {
        console.error("Error generating image with Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Error en la API de Gemini: ${error.message}`);
        }
        throw new Error("Un error inesperado ocurrió al generar la imagen.");
    }
};
