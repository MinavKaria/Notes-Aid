import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: 'https://go.fastrouter.ai/api/v1',
    apiKey: process.env.FASTROUTER_API_KEY || '',
});

export async function POST(request: NextRequest) {
    try {
        const { pdfContext, questionCount = 5, difficulty = 'medium' } = await request.json();

        if (!pdfContext) {
            return NextResponse.json(
                { error: 'PDF context is required' },
                { status: 400 }
            );
        }

        const systemMessage = {
            role: 'system' as const,
            content: `You are an AI quiz generator. Generate ${questionCount} ${difficulty} difficulty multiple-choice questions based on the provided PDF content. 

Return ONLY a valid JSON array with this exact structure:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Explanation of the correct answer with page reference"
  }
]

Make questions educational and test understanding, not just memorization.`,
        };

        const userMessage = {
            role: 'user' as const,
            content: `Generate ${questionCount} ${difficulty} difficulty quiz questions from this content:\n\n${pdfContext}`,
        };

        const completion = await openai.chat.completions.create({
            model: 'anthropic/claude-sonnet-4-20250514',
            messages: [systemMessage, userMessage],
            temperature: 0.8,
            max_tokens: 2000,
        });

        const responseText = completion.choices[0].message.content || '[]';
        
        // Try to extract JSON from the response
        let questions;
        try {
            // Try to parse directly
            questions = JSON.parse(responseText);
        } catch {
            // Try to extract JSON from markdown code blocks
            const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
            if (jsonMatch) {
                questions = JSON.parse(jsonMatch[1].trim());
            } else {
                // Try to find array in the text
                const arrayMatch = responseText.match(/\[[\s\S]*\]/);
                if (arrayMatch) {
                    questions = JSON.parse(arrayMatch[0]);
                } else {
                    throw new Error('Could not parse quiz questions from response');
                }
            }
        }

        return NextResponse.json({ questions });
    } catch (error) {
        console.error('Quiz API Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate quiz', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
