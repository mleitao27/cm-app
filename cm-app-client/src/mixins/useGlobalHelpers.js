export default function () {
  const dateTimeFormatting = (
    value,
    dateSeparator = '-',
    timeSeparator = ':'
  ) => {
    const date = new Date(value)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month < 10) month = '0' + month
    let day = date.getDate()
    if (day < 10) day = '0' + day
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    return (
      year +
      dateSeparator +
      month +
      dateSeparator +
      day +
      ' ' +
      hours +
      timeSeparator +
      minutes +
      timeSeparator +
      seconds
    )
  }

  const dateFormatting = (value, dateSeparator = '-') => {
    const date = new Date(value)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month < 10) month = '0' + month
    let day = date.getDate()
    if (day < 10) day = '0' + day
    return year + dateSeparator + month + dateSeparator + day
  }

  const timeFormatting = (value, timeSeparator = ':') => {
    const date = new Date(value)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    return hours + timeSeparator + minutes + timeSeparator + seconds
  }

  return {
    dateTimeFormatting,
    dateFormatting,
    timeFormatting
  }
}
