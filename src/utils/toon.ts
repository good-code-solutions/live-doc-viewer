import { encode, decode } from '@toon-format/toon';

export function jsonToToon(json: string): string {
    try {
        const obj = JSON.parse(json);
        return encode(obj);
    } catch (e) {
        console.error('Toon encoding error:', e);
        return 'Error: Invalid JSON or encoding failed';
    }
}

export function toonToJson(toon: string): string {
    try {
        const obj = decode(toon);
        return JSON.stringify(obj, null, 2);
    } catch (e) {
        console.error('Toon decoding error:', e);
        return 'Error: Invalid Toon format';
    }
}
