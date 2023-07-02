import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatUTCOne(utcString: string) {
  return dayjs.utc(utcString).utcOffset(8).format('YYYY-MM-DD')
}
export function formatUTCTwo(utcString: string) {
  return dayjs.utc(utcString).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
}
export function diffDate() {
  const now = dayjs()
  const createDate = dayjs('2023-3-28')
  return now.diff(createDate, 'day')
}
export function diffyear() {
  const createYear = '2023'
  const now = dayjs()
  const nowYear = now.format('YYYY-MM-DD').split('-')[0]

  if (nowYear == createYear) {
    return createYear
  } else {
    return createYear + '-' + nowYear
  }
}
