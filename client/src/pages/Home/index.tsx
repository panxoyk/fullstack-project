import NavBar from "@/components/NavBar"
import { logout, refresh } from "@/services/auth.service"
import { useSessionStore } from "@/hooks/session.store"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const Home = () => {
    const { session, deleteSession } = useSessionStore()
    const navigate = useNavigate()

    const handleClick = async() => {
        const { accessToken } = await refresh()
        if (!accessToken) {
            deleteSession()
            return navigate("/")
        }
        await logout(accessToken)
        deleteSession()
    }

    if(session) return <h1> Hola {session.name} <Button onClick={handleClick}> Log out </Button> </h1>

    return (
        <>
            <header>
                <NavBar />
            </header>
        </>
    )
}

export default Home