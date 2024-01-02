import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const NotFound = () => {
    return (
        <>
            <div className="m-auto w-fit flex justify-center flex-col h-screen items-center">
                <h1 className="scroll-m-20 text-8xl font-extrabold tracking-tight lg:text-9xl text-center">
                    404
                </h1>
                <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl">
                    Sorry! Page not found
                </h2>
                <Link to={"/"}>
                    <Button className="mt-8">
                        Back to home
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default NotFound