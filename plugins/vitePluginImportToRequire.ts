import { Plugin } from 'vite'

const importToRequireRegex: RegExp =
	/(?<=^|\n)import(\s*\{[\w$,\s]+\}\s*|\s+[\w$]+\s+)from\s*((['"])(?:fs-extra|googleapis|youtube-dl-exec|child_process|os|https)\3)/g

export function vitePluginImportToRequire(): Plugin {
	return {
		name: 'vite-plugin-import-to-require',
		transform(code, id) {
			if (id.includes('/node_modules/')) return null
			if (!id.includes('.ts')) return null
			code = code.replace(importToRequireRegex, (_, s1, s2) => {
				return `const ${s1} = require(${s2})`
			})
			return { code }
		}
	}
}
