export function getAccountEmailName(email: string): string {
    return email.split('@')[0]
}
