import { getTokenItem, setTokenItem, removeTokenItem } from '@/utils/item/token'
import { create } from 'zustand'

type TokenState = {
    token?: string,
    setToken: (newToken?: string) => void
    deleteToken: () => void
}

export const useTokenStore = create<TokenState>((set, get) => ({
    token: getTokenItem() ? JSON.parse(getTokenItem()!) : undefined,
    setToken: (newToken) => {
        const { token } = get()
        set({
            token: newToken
                ? newToken
                : token
        })
        setTokenItem(get().token!)
    },
    deleteToken: () => {
        set({
            token: undefined
        })
        removeTokenItem()
    }
}))