import { exec } from 'child_process'
import { platform } from 'os'

export function openInBrowser(url: string): void {
	let command: string | undefined

	switch (platform()) {
		case 'win32':
			command = `start ${url}`
			break
		case 'darwin':
			command = `open ${url}`
			break
		case 'linux':
			command = `xdg-open ${url}`
			break
	}
	if (command) {
		exec(command)
	}
}
