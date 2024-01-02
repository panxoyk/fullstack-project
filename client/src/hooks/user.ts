import { getAllUsers } from "@/services/user.service"
import { useQuery } from "@tanstack/react-query"
import { useSessionStore } from "./useSessionStore"

export const useFetchUsers = () => {
    const { session } = useSessionStore()

    return useQuery({
        queryKey: ["users"],
        enabled: !!session,
        queryFn: () => getAllUsers()
    })
}