import { masterEmailSchema } from '../constants/validationSchemas'
import { setState } from './useAppStore'

export async function setMasterEmail(masterEmail: string | undefined): Promise<void> {
	masterEmail = masterEmailSchema.cast(masterEmail)
	setState({ masterEmail })
}
