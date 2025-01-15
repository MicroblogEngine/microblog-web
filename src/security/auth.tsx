// contexts/use-counter-store-context.tsx
import { type ReactNode, createContext, useContext, useRef } from 'react'
import { createStore } from 'zustand'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

import { UserState, userStoreCreator } from '@/reducers/user'

export const createAuthStore = () => {
  return createStore<UserState>(userStoreCreator)
}

export type AuthStoreApi = ReturnType<typeof createAuthStore>

export const AuthContext = createContext<AuthStoreApi | undefined>(
  undefined,
)

export interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const storeRef = useRef<AuthStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createAuthStore()
  }

  return (
    <AuthContext.Provider value={storeRef.current}>
      {children}
    </AuthContext.Provider>
  )
}

export type UseAuthContextSelector<T> = (store: UserState) => T

export const useAuthContext = <T,>(
  selector: UseAuthContextSelector<T>,
): T => {
  const authContext = useContext(AuthContext)

  if (authContext === undefined) {
    throw new Error(
      'useCounterStoreContext must be used within CounterStoreProvider',
    )
  }

  return useStoreWithEqualityFn(authContext, selector, shallow)
}
