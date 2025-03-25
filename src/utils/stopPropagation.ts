import { SyntheticEvent } from 'react'

export function stopPropagation(event: SyntheticEvent | Event): void {
    event.stopPropagation()
}
