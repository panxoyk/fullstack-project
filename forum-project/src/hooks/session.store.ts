import { Session } from '@/types'
import { sessionItem } from '@/utils/item/session'
import { create } from 'zustand'

interface SessionState {
    session: Session,
    setSession: (newSession: Session) => void
    deleteSession: () => void
}

export const useSessionStore = create<SessionState>((set, get) => ({
    session: sessionItem ? JSON.parse(sessionItem) : undefined,
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