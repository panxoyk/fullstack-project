import { Session } from '@/types'
import { getSessionItem, setSessionItem, removeSessionItem } from '@/utils/item/session'
import { create } from 'zustand'

interface SessionState {
    session: Session,
    setSession: (newSession: Session) => void
    deleteSession: () => void
}

export const useSessionStore = create<SessionState>((set, get) => ({
    session: getSessionItem() ? JSON.parse(getSessionItem()!) : undefined,
    setSession: (newSession) => {
        const { session } = get()
        set({
            session: newSession
                ? newSession
                : session
        })
        setSessionItem(get().session)

    },
    deleteSession: () => {
        set({
            session: undefined
        })
        removeSessionItem()
    }
}))