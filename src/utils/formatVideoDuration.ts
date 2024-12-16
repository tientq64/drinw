export function formatVideoDuration(duration: string | number | null | undefined): string {
	if (duration == null) return ''

	const millis: number = Number(duration)
	const seconds: number = Math.floor(millis / 1000)
	const minutes: number = Math.floor(seconds / 60)
	const hours: number = Math.floor(minutes / 60)
	const secondsStr: string = String(seconds % 60).padStart(2, '0')
	const minutesStr: string = String(minutes % 60).padStart(2, '0') + ':'
	const hoursStr: string = hours === 0 ? '' : hours + ':'

	return hoursStr + minutesStr + secondsStr
}
