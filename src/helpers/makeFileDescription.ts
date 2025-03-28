import { PropertiesData } from './makeFileProperties'

type Item = [label: string, value: any]

export function makeFileDescription(data: PropertiesData | undefined): string | undefined {
    if (data === undefined) return undefined

    const items: Item[] = [
        ['id', data.fileId],
        ['userId', data.userId],
        ['userName', data.userName],
        ['pageUrl', data.pageUrl]
    ]
    const formatedItems: Item[] = items.filter(([, value]) => {
        if (value == null) return false
        if (value === '') return false
        if (typeof value === 'boolean') return false
        if (Number.isNaN(value)) return false
        return true
    })
    const lines: string[] = formatedItems.map((item) => {
        return item.join(': ')
    })
    const description: string = lines.join('\n').trim()

    return description || undefined
}
