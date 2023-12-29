import { Session } from '@/types'
import { create } from 'zustand'

interface SessionState {
    session?: Session,
    setSession: (newSession?: Session) => void
    deleteSession: () => void
}

export const useSessionStore = create<SessionState>((set, get) => ({
    session: undefined,
    setSession: (newSession) => {
        const { session } = get()
        set({
            session: newSession
                ? newSession
                : session
        })
    },
    deleteSession: () => {
        set({
            session: undefined
        })
    }
}))