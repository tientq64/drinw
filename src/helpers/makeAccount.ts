import { Account } from '../store/types'

export function makeAccount({
    email,
    title,
    kindName,
    mainDirId,
    driveSize = 0,
    trashSize = 0,
    privateKey
}: Partial<Account>): Account {
    if (!email) {
        throw Error('Tài khoản bắt buộc phải có email')
    }
    if (!privateKey) {
        throw Error('Tài khoản bắt buộc phải có private key')
    }

    title ||= undefined
    kindName ||= undefined
    mainDirId ||= undefined

    return {
        email,
        title,
        kindName,
        mainDirId,
        driveSize,
        trashSize,
        privateKey
    }
}
