import { ReportData } from './table'

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function convertData(data: ReportData[]) {
  data?.forEach((object) => {
    if (object.Date) {
      const newData = new Date(object.Date)
      object.Date = newData.toDateString()
    }
  })

  return data
}

export const convertMonth = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]
