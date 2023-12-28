import Container from "@/components/Container"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import SignupForm from "./SignupForm"

const Signup = () => {
    return (
        <>
            <div className="flex flex-col justify-center h-screen">
                <Container>
                    <Card className="w-[360px] sm:w-[512px]">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl"> Sign up </CardTitle>
                            <CardDescription> Enter all fields to create your account </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SignupForm />
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <span className="text-sm text-muted-foreground">
                                Have an account?
                                <Link to={"/login"}>
                                    <span className="text-primary"> Log in </span>
                                </Link>
                            </span>
                        </CardFooter>
                    </Card>
                </Container>
            </div>
        </>
    )
}

export default Signup