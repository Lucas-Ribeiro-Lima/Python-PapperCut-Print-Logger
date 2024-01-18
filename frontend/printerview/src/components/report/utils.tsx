import { ApiClient } from '@/lib/api'
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

export async function downloadExcel(ano: number, mes: string) {
  const api = ApiClient()
  try {
    const response = await api.get(
      `/getDataframe/download?ano=${ano}&mes=${mes}`,
      {
        responseType: 'arraybuffer',
      },
    )

    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `relatorio_impressao_${mes}_${ano}`
    document.body.appendChild(link)
    link.click()
    document.body.appendChild(link)
  } catch (error) {
    console.error('Erro:', error)
  }
}
