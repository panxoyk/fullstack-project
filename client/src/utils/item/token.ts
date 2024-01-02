const item = "token"

export const getTokenItem = () => localStorage.getItem(item)

export const setTokenItem = (token: string) => localStorage.setItem(item, token)

export const removeTokenItem = () => localStorage.removeItem(item)