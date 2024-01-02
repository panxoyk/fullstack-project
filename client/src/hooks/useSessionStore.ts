import { Session } from '@/types'
import { create } from 'zustand'
import { jwtDecode } from "jwt-decode";

type SessionState = {
    session?: Session,
    setSession: (token?: string) => void
    deleteSession: () => void
}

export const useSessionStore = create<SessionState>((set) => ({
    session: undefined,
    setSession: (token) => {
        set({
            session: token ? jwtDecode(token) : undefined
        })
    },
    deleteSession: () => {
        set({
            session: undefined
        })
    }
}))