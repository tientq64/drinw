import { setState } from './useAppStore'

export function setUploadChunkSize(uploadChunkSize: number): void {
    setState({ uploadChunkSize })
}
