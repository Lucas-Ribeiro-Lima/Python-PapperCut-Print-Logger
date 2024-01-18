import { ApiClient } from '@/lib/api'
import useSWR from 'swr'

export function FetchData<T>(url: string) {
  const { data, isLoading, error } = useSWR<T>(url, async () => {
    const api = ApiClient()
    const response = await api.get(url)
    return response.data
  })

  return { data, isLoading, error }
}
