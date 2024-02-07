import { AuthProvider } from '@/components/context/authProvider'
import Main from '@/components/ui/Main'

export default function Home() {
  return (
    <AuthProvider>
      <Main>Main Page</Main>
    </AuthProvider>
  )
}
