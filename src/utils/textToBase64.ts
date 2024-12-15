export function textToBase64(text: string): string {
	return Buffer.from(text, 'utf8').toString('base64')
}
