"use client";
import { useState } from 'react';

export default function PromptForm() {
    const [prompt, setPrompt] = useState('');
    const [tokenCount, setTokenCount] = useState(0); // Número de tokens
    const [complexityScore, setComplexityScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);  // Estado de carregamento
    const [error, setError] = useState<string | null>(null);  // Estado de erro

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setComplexityScore(null);

        try {
            const response = await fetch('/api/calculoPrompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    token_count: tokenCount,
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Erro no servidor: ${errorMessage}`);
            }

            const data = await response.json();

            if (data.complexity_score !== undefined) {
                setComplexityScore(data.complexity_score); // Define o valor da complexidade
            } else {
                throw new Error('Formato inesperado de resposta');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Calcular Complexidade do Prompt</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Digite seu prompt"
                    rows={5}
                    cols={50}
                />
                <input
                    type="number"
                    value={tokenCount}
                    onChange={(e) => setTokenCount(Number(e.target.value))}
                    placeholder="Número de tokens"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Calculando...' : 'Calcular Complexidade'}
                </button>
            </form>

            {loading && <p>Calculando, por favor aguarde...</p>}

            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

            {complexityScore !== null && (
                <p>Complexidade calculada: {complexityScore}</p>
            )}
        </div>
    );
}
