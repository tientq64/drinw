import { AccountKindEnum } from '../constants/accountKinds'

export interface Account {
    email: string
    title?: string
    kindName?: AccountKindEnum
    mainDirId?: string
    tiktokUsernameFirstLetter?: string
    driveSize: number
    trashSize: number
    privateKey: string
}
