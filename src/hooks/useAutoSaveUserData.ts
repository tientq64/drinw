import { useUpdateEffect } from 'ahooks'
import { saveUserData } from '../helpers/saveUserData'
import { useAppStore } from '../store/useAppStore'

export function useAutoSaveUserData(): void {
    const masterEmail = useAppStore((state) => state.masterEmail)
    const accounts = useAppStore((state) => state.accounts)

    useUpdateEffect(() => {
        saveUserData({ masterEmail, accounts })
    }, [masterEmail, accounts])
}
