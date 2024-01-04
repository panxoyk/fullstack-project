import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Container from "@/components/Container"
import { useSessionStore } from "@/hooks/useSessionStore"
import { logout } from "@/services/auth.service"
import { removeTokenItem } from "@/utils/item/token"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, User } from "lucide-react"

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
                            ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={"ghost"} className="relative size-8 rounded-full">
                                        <Avatar>
                                            <AvatarImage src="/profile.png" alt="profile picture" />
                                            <AvatarFallback> U </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div>
                                            <p className="text-sm font-medium leading-none"> {session.email} </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <User size={16} className="mr-2" />
                                            <span> Profile </span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings size={16} className="mr-2" />
                                            <span> Settings </span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut size={16} className="mr-2" />
                                        <span> Log out </span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            )
                            : (
                            <div className="p-2 flex flex-row items-center justify-between">
                                <NavLink to={"/login"}> <Button variant={"ghost"} className="text-base font-semibold mx-2"> LOG IN </Button> </NavLink>
                                <NavLink to={"/signup"}> <Button variant={"outline"} className="text-base font-semibold mx-2"> SIGN UP </Button> </NavLink>
                            </div>
                            )
                    }

                </div>
            </Container>
        </nav>
    )
}

export default NavBar