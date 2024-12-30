type Unit = 'B' | 'KB' | 'MB' | 'GB' | 'TB'

const units: Unit[] = ['B', 'KB', 'MB', 'GB', 'TB']

export function convertToBytes(value: string | number, unit?: Unit): number {
	if (unit === undefined) {
		const matches = String(value).match(/^(\d+(?:\.\d+)?) *([KMGT]?B)$/)
		if (matches === null) {
			throw Error('Giá trị hoặc đơn vị không hợp lệ')
		}
		value = matches[1]
		unit = matches[2] as Unit
	}
	if (!units.includes(unit)) {
		throw TypeError(`Đơn vị "${unit}" không hợp lệ`)
	}
	value = Number(value)

	for (const unit2 of units) {
		if (unit === unit2) break
		value *= 1024
	}

	return value
}
