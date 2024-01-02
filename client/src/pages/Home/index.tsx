import NavBar from "@/components/NavBar"
import { logout } from "@/services/auth.service"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useSessionStore } from "@/hooks/useSessionStore"
import { removeTokenItem } from "@/utils/item/token"
import { useFetchUsers } from "@/hooks/user"

const Home = () => {
    const navigate = useNavigate()
    const { session, deleteSession } = useSessionStore()
    const { data: users } = useFetchUsers()

    const handleLogout = async() => {
        await logout()
        deleteSession()
        removeTokenItem()
        location.reload()
        navigate("/")
    }

    return (
        <>
            <header>
                <NavBar />
                {
                    users?.map((user: any) => (
                        <p key={user.id}> {user.name} </p>
                    ))
                }
                {
                    session ? <Button onClick={handleLogout}> Log out {session.email} </Button> : null
                }

            </header>
        </>
    )
}

export default Home