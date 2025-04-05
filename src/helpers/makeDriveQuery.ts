export type SubQuery = string | number | boolean | null | undefined

export function makeDriveQuery(subQueries: SubQuery[]): string {
    const query: string = subQueries
        .filter((subQuery) => typeof subQuery === 'string' && subQuery.trim() !== '')
        .join(' and ')

    return query
}
