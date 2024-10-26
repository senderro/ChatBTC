import { NextResponse } from 'next/server';

// Função para lidar com requisições POST
export async function POST(request: Request) {
    try {
        // Extrai os dados do corpo da requisição (prompt e token_count)
        const body = await request.json();
        const { prompt, token_count } = body;

        // Verificação simples para validar os parâmetros
        if (!prompt || typeof token_count !== 'number') {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        // Faz a requisição para o FastAPI
        const fastApiResponse = await fetch('http://127.0.0.1:8000/calculate_complexity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                token_count: token_count,
            }),
        });

        // Verifica se a requisição para o FastAPI foi bem-sucedida
        if (!fastApiResponse.ok) {
            const errorText = await fastApiResponse.text();
            throw new Error(`Erro na API FastAPI: ${fastApiResponse.status} - ${errorText}`);
        }

        // Converte a resposta do FastAPI em JSON
        const fastApiData = await fastApiResponse.json();

        // Retorna a resposta para o frontend
        return NextResponse.json(fastApiData);
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        return NextResponse.json({ error: 'Erro ao conectar à API Python' }, { status: 500 });
    }
}
