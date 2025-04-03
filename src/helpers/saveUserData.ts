import { writeJson } from 'fs-extra'
import { UserData, userDataFilePath } from './loadUserData'

export function saveUserData(userData: UserData): Promise<void> {
    return writeJson(userDataFilePath, userData, { spaces: 4 })
}
