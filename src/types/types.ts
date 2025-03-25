import { Location } from 'react-router-dom'
import { DriveNavigateState } from '../hooks/useDriveNavigate'

export type StateLocation = Location<DriveNavigateState | undefined>
