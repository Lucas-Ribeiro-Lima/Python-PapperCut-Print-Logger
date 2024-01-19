'use client'

import { api } from '@/lib/api'
import { parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'

export type UserType = {
  userId: string
  exp: number
  avatarUrl: string
}

export type SignInType = {
  username: string
  password: string
}

export type AuthContextType = {
  user: UserType
  signIn: ({ username, password }: SignInType) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    async function validateUser() {
      // eslint-disable-next-line prettier/prettier
      const { 'printerViewJwt': jwt } = parseCookies()
      if (jwt) {
        api.defaults.headers.common.Authorization = jwt
        const { data } = await api.get<UserType>('/getUser')
        setUser(data)
      }
    }
    validateUser()
  }, [])

  async function signIn({ username, password }: SignInType) {
    try {
      const { data: token } = await api.get<string>(
        `/login?username=${username}&password=${password}`,
      )

      setCookie(undefined, 'printerViewJwt', token, {
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
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
