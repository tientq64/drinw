import { ViewModeEnum } from '../constants/viewModes'
import { setState } from './useAppStore'

export function setViewModeName(viewModeName: ViewModeEnum): void {
    setState({ viewModeName })
}
