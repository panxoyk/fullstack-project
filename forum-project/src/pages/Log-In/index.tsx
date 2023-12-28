import Container from "@/components/Container"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import LoginForm from "./LoginForm"

const Login = () => {
    return (
        <>
            <div className="h-screen flex flex-col justify-center">
                <Container>
                    <Card className="w-[360px] sm:w-[512px]">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl"> Log in </CardTitle>
                            <CardDescription> Enter your email and password to log in </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LoginForm /> HOLA
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <span className="text-sm text-muted-foreground">
                                Don't have an account?
                                <Link to={"/signup"}>
                                    <span className="text-primary"> Sign up </span>
                                </Link>
                            </span>
                        </CardFooter>
                    </Card>
                </Container>
            </div>
        </>
    )
}

export default Login