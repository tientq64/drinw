export enum AccountKindEnum {
	YouTube = 'YouTube',
	TikTok = 'TikTok',
	SpankBang = 'SpankBang',
	Facebook = 'Facebook',
	MrCong = 'MrCong'
}

export interface AccountKind {
	name: AccountKindEnum
	iconUrl?: string
}

export const accountKinds: AccountKind[] = [
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
	},
	{
		name: AccountKindEnum.MrCong,
		iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=mrcong.com'
	}
]

export function findAccountKind(name: string): AccountKind | undefined {
	return accountKinds.find((accountKind) => accountKind.name === name)
}
