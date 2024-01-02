import NavBar from "@/components/NavBar"
import { useFetchUsers } from "@/hooks/user"

const Home = () => {
    const { data: users } = useFetchUsers()

    return (
        <>
            <header>
                <NavBar />
                {
                    users?.map((user: any) => (
                        <p key={user.id}> {user.name} </p>
                    ))
                }
            </header>
        </>
    )
}

export default Home