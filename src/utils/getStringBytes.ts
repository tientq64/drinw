export function getStringBytes(text: string): number {
    return new TextEncoder().encode(text).length
}
