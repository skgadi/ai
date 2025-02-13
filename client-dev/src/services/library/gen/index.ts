//File related

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

// Date time related
export const dateTimeDisplayOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
}

export const showTimeFromNumber = (time: number) => {
  //Time is in hours
  const hours = Math.floor(time)
  const minutes = Math.floor((time - hours) * 60)
  const seconds = Math.floor(((time - hours) * 60 - minutes) * 60)
  return `${hours}:${minutes}:${seconds}`
}

export const displayDateTime = (inDate: string | Date | undefined | null) => {
  if (!inDate) {
    inDate = new Date()
  }
  if (typeof inDate === 'string') {
    inDate = new Date(inDate)
  }
  return inDate.toLocaleString('en', dateTimeDisplayOptions)
}

export const dateDisplayOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}
export const displayDate = (inDate: string | Date) => {
  if (typeof inDate === 'string') {
    inDate = new Date(inDate)
  }
  return inDate.toLocaleDateString('en', dateDisplayOptions)
}

export const toLocalISOString = (date: Date) => {
  //console.log(typeof date);
  const tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num: number) {
      return (num < 10 ? '0' : '') + num
    }

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' +
    pad(Math.abs(tzo) % 60)
  )
}
