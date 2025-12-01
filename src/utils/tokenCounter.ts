import { encodingForModel } from 'js-tiktoken';

// Use GPT-4 tokenizer for accurate token counting
const encoding = encodingForModel('gpt-4');

export function countTokens(text: string): number {
    try {
        const tokens = encoding.encode(text);
        return tokens.length;
    } catch (e) {
        // Fallback to approximation if encoding fails
        console.error('Token encoding error:', e);
        return Math.ceil(text.length / 4);
    }
}

export function calculateTokenSavings(jsonText: string, toonText: string): {
    jsonTokens: number;
    toonTokens: number;
    saved: number;
    percentage: number;
} {
    const jsonTokens = countTokens(jsonText);
    const toonTokens = countTokens(toonText);
    const saved = jsonTokens - toonTokens;
    const percentage = jsonTokens > 0 ? Math.round((saved / jsonTokens) * 100) : 0;

    return { jsonTokens, toonTokens, saved, percentage };
}
