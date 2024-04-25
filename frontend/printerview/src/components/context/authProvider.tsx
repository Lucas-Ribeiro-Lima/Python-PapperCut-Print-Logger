'use client'

import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'

export type UserType = {
  userID: string
  exp: number
  avatar_url: string
}

export type SignInType = {
  username: string
  password: string
}

export type AuthContextType = {
  user: UserType
  isAuthenticaded: boolean
  signIn: ({ username, password }: SignInType) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null)
  const [isAuthenticaded, setIsAuthenticated] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    async function validateUser() {
      try {
        const { printerViewJwt: jwt } = parseCookies()
        if (jwt) {
          api.defaults.headers.common.Authorization = jwt
          const { data } = await api.get<UserType>('/getUser')
          setUser(data)
          setIsAuthenticated(true)
        } else {
          router.push('/login')
        }
      } catch (error) {
        router.push('/login')
        console.log(error)
      }
    }
    validateUser()
  }, [])

  async function signIn({ username, password }: SignInType) {
    try {
      const { data: token } = await api.get<string>(
        `/login?username=${username}&password=${password}`,
      )

      setIsAuthenticated(true)

      setCookie(undefined, 'printerViewJwt', token, {
        path: '/',
        maxAge: 60 * 60 * 1, // 1 hour
      })

      api.defaults.headers.common.Authorization = token

      const { data: user } = await api.get<UserType>(`/getUser`)
      setUser(user)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticaded, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
