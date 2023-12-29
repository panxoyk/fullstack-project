import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoginValues, resolver } from "./login"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { login } from "@/services/user.service"
import { useNavigate } from "react-router-dom"
import { useSessionStore } from "@/store/session.store"

const LoginForm = () => {
    const navigate = useNavigate()
    const { setSession } = useSessionStore()

    const form = useForm<LoginValues>({
        resolver,
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (data: LoginValues) => {
        const session = await login(data)
        setSession(session)
        window.localStorage.setItem("session", JSON.stringify(session))
        navigate("/")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel> Email </FormLabel>
                        <FormControl>
                            <Input placeholder="m@example.com" autoComplete="no" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel> Password </FormLabel>
                        <FormControl>
                            <Input autoComplete="no" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit"> Continue </Button>
            </form>
        </Form>
    )
}

export default LoginForm