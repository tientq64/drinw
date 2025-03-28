import { setState } from './useAppStore'

export function setIsMaximized(isMaximized: boolean): void {
    setState({ isMaximized })

    if (isMaximized) {
        document.body.classList.add('dnw-maximized')
        document.body.classList.remove('dnw-unmaximized')
    } else {
        document.body.classList.add('dnw-unmaximized')
        document.body.classList.remove('dnw-maximized')
    }
}
