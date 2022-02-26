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
    if (hours < 10) hours = '0' + hours
    let minutes = date.getMinutes()
    if (minutes < 10) minutes = '0' + minutes
    let seconds = date.getSeconds()
    if (seconds < 10) seconds = '0' + seconds
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
    if (hours < 10) hours = '0' + hours
    let minutes = date.getMinutes()
    if (minutes < 10) minutes = '0' + minutes
    let seconds = date.getSeconds()
    if (seconds < 10) seconds = '0' + seconds
    return hours + timeSeparator + minutes + timeSeparator + seconds
  }

  const personTable = (data) => {
    return [
      {
        label: 'Nome',
        value: data.name
      },
      {
        label: 'Morada',
        value: data.address
      },
      {
        label: 'NIF',
        value: data.fiscalNumber
      },
      {
        label: 'Cliente desde',
        value: dateTimeFormatting(data.createdAt)
      }
    ]
  }

  const serviceTable = (data) => {
    return [
      {
        label: 'Tipo',
        value: data.type
      },
      {
        label: 'Regime',
        value: data.regime
      },
      {
        label: 'Turnos',
        value: data.shifts
      },
      {
        label: 'Início',
        value: data.beginning
      },
      {
        label: 'Duração',
        value: data.duration
      },
      {
        label: 'Cliente desde',
        value: dateTimeFormatting(data.createdAt)
      }
    ]
  }

  return {
    dateTimeFormatting,
    dateFormatting,
    timeFormatting,
    personTable,
    serviceTable
  }
}
