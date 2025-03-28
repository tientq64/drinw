import { Plugin } from 'vite'

const importToRequireRegex: RegExp =
    /(?<=^|\n)import(?:\s+type\b)?(?:(?:\s+([\w$]+)\s*,)?(\s*\{[\w$,\s]+\}\s*)|(\s+[\w$]+\s+))from\s*((?<quote>['"])(?:fs-extra|googleapis|google-auth-library|youtube-dl-exec|node-fetch|form-data|electron|child_process|os|https|path)[\/\w\-]*\k<quote>)/g

/**
 * Vite plugin convert tất cả các câu lệnh `import` thư viện nodejs sang `require`.
 */
export function vitePluginImportToRequire(): Plugin {
    return {
        name: 'vite-plugin-import-to-require',
        transform(code, id) {
            if (id.includes('/node_modules/')) return null
            if (!id.includes('.ts')) return null
            code = code.replace(importToRequireRegex, (_, s1, s2, s3, s4) => {
                let lines: string[] = []
                if (s2) {
                    s2 = s2.replace(/ as /g, ': ')
                    lines.push(`const ${s2} = require(${s4})`)
                }
                if (s3) {
                    s3 = s3.trim()
                    lines.push(`let ${s3} = require(${s4})`)
                    lines.push(`if (${s3}.__esModule) ${s3} = ${s3}.default`)
                }
                if (s1) {
                    s1 = s1.trim()
                    lines.push(`let ${s1} = require(${s4})`)
                    lines.push(`if (${s1}.__esModule) ${s1} = ${s1}.default`)
                }
                return lines.join('\n')
            })
            return { code }
        }
    }
}
