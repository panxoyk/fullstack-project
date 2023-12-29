import NavBar from "@/components/NavBar"
import { logout } from "@/services/auth.service"
import { useSessionStore } from "@/hooks/session.store"

const Home = () => {
    const { session, deleteSession } = useSessionStore()

    const handleClick = () => {
        if (session) logout()
        window.localStorage.removeItem("session")
        deleteSession()
    }

    if(session) return <h1> Hola {session.name} <button onClick={handleClick}> LOGOUT </button> </h1>

    return (
        <>
            <header>
                <NavBar />
            </header>
        </>
    )
}

export default Home