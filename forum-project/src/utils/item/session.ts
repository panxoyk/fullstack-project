import { Session } from "@/types"

export const sessionItem = localStorage.getItem('session')

export const setSessionItem = (session: Session) => localStorage.setItem('session', JSON.stringify(session))