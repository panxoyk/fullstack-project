import { Session } from "@/types"

export const getSessionItem = () => localStorage.getItem("session")

export const setSessionItem = (session: Session) => localStorage.setItem("session", JSON.stringify(session))

export const removeSessionItem = () => localStorage.removeItem("session")