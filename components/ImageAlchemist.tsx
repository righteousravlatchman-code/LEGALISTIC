import React, { useState, useCallback } from 'react';
import { editImage, analyzeImage } from '../services/geminiService';
import Spinner from './Spinner';

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

const ImageAlchemist: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<{file: File, url: string} | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'edit' | 'analyze'>('edit');
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setOriginalImage({file, url: URL.createObjectURL(file)});
            setEditedImage(null);
            setAnalysis(null);
            setError(null);
        }
    };
    
    const handleSubmit = useCallback(async () => {
        if (!originalImage) return;

        setIsLoading(true);
        setError(null);
        setEditedImage(null);
        setAnalysis(null);

        try {
            const base64Data = await fileToBase64(originalImage.file);
            const mimeType = originalImage.file.type;
            
            if (activeTab === 'edit') {
                if (!prompt) {
                    setError("Please enter an editing prompt.");
                    setIsLoading(false);
                    return;
                }
                const result = await editImage(base64Data, mimeType, prompt);
                setEditedImage(`data:image/png;base64,${result}`);
            } else {
                 const result = await analyzeImage(base64Data, mimeType);
                 setAnalysis(result);
            }

        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [originalImage, prompt, activeTab]);

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col items-center w-full">
            <div className="w-full max-w-5xl">
                <div className="text-center mb-8">
                    <h1 style={{fontFamily: 'var(--font-serif)'}} className="text-4xl font-bold gradient-text">Image Alchemist</h1>
                    <p className="text-[var(--color-text-secondary)] mt-2">Analyze or transform images with the power of AI.</p>
                </div>

                <div className="glass-card p-4 md:p-6">
                    {!originalImage && (
                         <div className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-accent-gold)]/30 rounded-lg p-6 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[var(--color-accent-gold)]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <p className="mt-4 text-lg font-semibold text-white">Upload an image to begin</p>
                            <p className="text-sm text-[var(--color-text-secondary)]">PNG, JPG, GIF up to 10MB</p>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
                            <label htmlFor="file-upload" className="mt-4 cursor-pointer bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg shadow-yellow-900/20 hover:shadow-xl hover:shadow-yellow-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]">
                                Select File
                            </label>
                        </div>
                    )}

                    {originalImage && (
                        <div className="space-y-6">
                             <div className="flex justify-center space-x-2 border-b border-[var(--color-accent-gold)]/20 mb-4">
                                <button onClick={() => setActiveTab('edit')} className={`px-4 py-2 text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] ${activeTab === 'edit' ? 'text-[var(--color-accent-gold)] border-b-2 border-[var(--color-accent-gold)]' : 'text-[var(--color-text-secondary)] hover:text-white'}`} style={{fontFamily: 'var(--font-serif)'}}>Edit</button>
                                <button onClick={() => setActiveTab('analyze')} className={`px-4 py-2 text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] ${activeTab === 'analyze' ? 'text-[var(--color-accent-gold)] border-b-2 border-[var(--color-accent-gold)]' : 'text-[var(--color-text-secondary)] hover:text-white'}`} style={{fontFamily: 'var(--font-serif)'}}>Analyze</button>
                            </div>
                            
                            {activeTab === 'edit' && (
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <input 
                                        type="text"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="e.g., 'Add a retro filter' or 'Make the sky purple'"
                                        className="flex-grow w-full bg-black/30 border-white/20 focus:border-[var(--color-accent-gold)] focus:ring-[var(--color-accent-gold)] rounded-lg shadow-sm text-white py-2 px-3"
                                    />
                                    <button onClick={handleSubmit} disabled={isLoading || !prompt} className="w-full sm:w-auto bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg shadow-yellow-900/20 hover:shadow-xl hover:shadow-yellow-900/30 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]">
                                        {isLoading ? <Spinner /> : 'Generate'}
                                    </button>
                                </div>
                            )}

                             {activeTab === 'analyze' && (
                                <div className="text-center">
                                    <button onClick={handleSubmit} disabled={isLoading} className="bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-bright)] text-black font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg shadow-yellow-900/20 hover:shadow-xl hover:shadow-yellow-900/30 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)]">
                                        {isLoading ? <Spinner /> : 'Analyze Image'}
                                    </button>
                                </div>
                            )}
                            
                            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-2 text-white">Original</h3>
                                    <img src={originalImage.url} alt="Original" className="rounded-lg w-full h-auto object-contain max-h-96" />
                                     <button 
                                        onClick={() => setOriginalImage(null)}
                                        className="mt-4 text-sm text-[var(--color-text-secondary)] hover:text-white underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[var(--color-accent-gold)] rounded-md"
                                    >
                                        Use a different image
                                    </button>
                                </div>

                                <div className="text-center min-h-[20rem] flex flex-col justify-center items-center bg-black/30 rounded-lg p-4 border border-[var(--color-accent-gold)]/20">
                                    {isLoading ? <Spinner /> :
                                        activeTab === 'edit' ? (
                                             editedImage ? (
                                                <>
                                                    <h3 className="text-lg font-semibold mb-2 text-white">Edited</h3>
                                                    <img src={editedImage} alt="Edited" className="rounded-lg w-full h-auto object-contain max-h-96" />
                                                </>
                                            ) : <p className="text-[var(--color-text-secondary)]">Your edited image will appear here.</p>
                                        ) : (
                                            analysis ? (
                                                <div className="text-left">
                                                     <h3 className="text-lg font-semibold mb-2 text-center text-white">Analysis</h3>
                                                     <p className="text-[var(--color-text-secondary)] whitespace-pre-wrap">{analysis}</p>
                                                </div>
                                            ) : <p className="text-[var(--color-text-secondary)]">The image analysis will appear here.</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageAlchemist;