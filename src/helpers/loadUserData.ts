import { readJsonSync } from 'fs-extra'
import { AppStore } from '../store/useAppStore'

export type UserData = Pick<AppStore, 'masterEmail' | 'accounts'>

export const userDataFilePath: string = 'data/userData.json'

const defaultUserData: UserData = {
    masterEmail: undefined,
    accounts: []
}

export function loadUserData(): UserData {
    let jsonUserData: Partial<UserData>

    try {
        jsonUserData = readJsonSync(userDataFilePath)
    } catch {
        jsonUserData = {}
    }

    const userData: UserData = {
        ...defaultUserData,
        ...jsonUserData
    }
    return userData
}
