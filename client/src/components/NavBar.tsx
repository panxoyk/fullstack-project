import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Container from "@/components/Container"
import { useSessionStore } from "@/hooks/useSessionStore"
import { logout } from "@/services/auth.service"
import { removeTokenItem } from "@/utils/item/token"

const NavBar = () => {
    const navigate = useNavigate()
    const { session, deleteSession } = useSessionStore()

    const handleLogout = async() => {
        await logout()
        deleteSession()
        removeTokenItem()
        navigate("/login")
    }

    return (
        <nav className="border-b-2">
            <Container>
                <div className="flex flex-row items-center justify-between ">
                    <div className="p-2">
                        <NavLink to={"/"}>
                            <Button variant={"link"} className="hover:no-underline text-base"> HOME </Button>
                        </NavLink>
                    </div>
                    {
                        session
                            ? <div className="p-2 flex flex-row items-center justify-between">
                                <p> {session.email} </p>
                                <Button onClick={handleLogout} variant={"outline"} className="text-base font-semibold mx-2"> LOG OUT </Button>
                            </div>
                            : <div className="p-2 flex flex-row items-center justify-between">
                                <NavLink to={"/login"}> <Button variant={"ghost"} className="text-base font-semibold mx-2"> LOG IN </Button> </NavLink>
                                <NavLink to={"/signup"}> <Button variant={"outline"} className="text-base font-semibold mx-2"> SIGN UP </Button> </NavLink>
                            </div>
                    }

                </div>
            </Container>
        </nav>
    )
}

export default NavBar