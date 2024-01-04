import Container from "@/components/Container"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import Form from "./Form"

const Login = () => {
    return (
        <>
            <div className="flex flex-col justify-center my-2 sm:h-screen">
                <Container>
                    <Card className="w-[360px] sm:w-[512px]">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center"> Log in </CardTitle>
                            <CardDescription className="text-center"> Enter your email and password to log in </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <span className="text-sm text-muted-foreground">
                                Don't have an account?
                                <Link to={"/signup"}>
                                    <span className="text-primary"> Sign up </span>
                                </Link>
                            </span>
                            <span className="text-sm text-muted-foreground">
                                Back to
                                <Link to={"/"}>
                                    <span className="text-primary"> Home </span>
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