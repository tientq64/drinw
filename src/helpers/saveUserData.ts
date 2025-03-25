import { writeJsonSync } from 'fs-extra'
import { UserData, userDataFilePath } from './loadUserData'

export function saveUserData(userData: UserData): void {
    writeJsonSync(userDataFilePath, userData, { spaces: 4 })
}
