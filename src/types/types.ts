import { Location } from 'react-router-dom'
import { DriveNavigateState } from '../hooks/useDriveNavigate'

export type StateLocation = Location<DriveNavigateState | null>

export type LocalFile = File
