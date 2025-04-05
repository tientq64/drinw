export const enum AccountKindEnum {
    YouTube = 'YouTube',
    TikTok = 'TikTok',
    SpankBang = 'SpankBang',
    Facebook = 'Facebook'
}

export interface AccountKind {
    name: AccountKindEnum
    domain: string
    iconUrl: string
}

export const accountKinds: AccountKind[] = [
    {
        name: AccountKindEnum.YouTube,
        domain: 'youtube.com',
        iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=youtube.com'
    },
    {
        name: AccountKindEnum.TikTok,
        domain: 'tiktok.com',
        iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=tiktok.com'
    },
    {
        name: AccountKindEnum.SpankBang,
        domain: 'spankbang.com',
        iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=spankbang.com'
    },
    {
        name: AccountKindEnum.Facebook,
        domain: 'facebook.com',
        iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=facebook.com'
    }
]

export function getAccountKind(name: AccountKindEnum): AccountKind
export function getAccountKind(name: string | undefined): AccountKind | undefined

export function getAccountKind(
    name: AccountKindEnum | string | undefined
): AccountKind | undefined {
    return accountKinds.find((kind) => kind.name === name)
}

export function findAccountKindByDomain(domain: string): AccountKind | undefined {
    const formatedDomain: string = domain.replace(/^www\./, '')

    return accountKinds.find((kind) => kind.domain === formatedDomain)
}
