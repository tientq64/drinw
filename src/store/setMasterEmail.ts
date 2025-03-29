import { setState } from './useAppStore'

export function setMasterEmail(masterEmail: string | undefined): void {
    setState({
        masterEmail: masterEmail || undefined
    })
}
