export const enum AccountKindEnum {
    YouTube = 'YouTube',
    TikTok = 'TikTok',
    SpankBang = 'SpankBang',
    Facebook = 'Facebook',
    None = ''
}

export interface AccountKind {
    name: AccountKindEnum
    iconUrl?: string
}

export const accountKinds: AccountKind[] = [
    {
        name: AccountKindEnum.None
    },
    {
        name: AccountKindEnum.YouTube,
        iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=youtube.com'
    },
    {
        name: AccountKindEnum.TikTok,
        iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=tiktok.com'
    },
    {
        name: AccountKindEnum.SpankBang,
        iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=spankbang.com'
    },
    {
        name: AccountKindEnum.Facebook,
        iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=facebook.com'
    }
]

export function getAccountKind(name: AccountKindEnum): AccountKind
export function getAccountKind(name: string | undefined): AccountKind | undefined

export function getAccountKind(
    name: AccountKindEnum | string | undefined = ''
): AccountKind | undefined {
    return accountKinds.find((accountKind) => accountKind.name === name)
}
