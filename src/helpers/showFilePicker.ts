import { ipcRenderer, OpenDialogSyncOptions } from 'electron'

export function showFilePicker(
    title: string,
    properties: OpenDialogSyncOptions['properties']
): string[] | undefined {
    return ipcRenderer.sendSync('showFilePicker', title, properties)
}
