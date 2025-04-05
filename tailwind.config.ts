import plugin from 'tailwindcss/plugin'

/**
 * @type {import('tailwindcss').Config}
 */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {}
    },
    plugins: [
        plugin(({ addVariant }) => {
            addVariant('compact', 'body.dnw-compact &')
        })
    ]
}
