import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { LoginSchema } from "@/schemas/login.schema"
import { login } from "@/services/auth.service"
import { useSessionStore } from "@/hooks/session.store"
import { LoginValues } from "@/types"


const LoginForm = () => {
    const navigate = useNavigate()
    const { setSession } = useSessionStore()

    const form = useForm<LoginValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (data: LoginValues) => {
        const response = await login(data)
        if(!response) {
            // Por mientras
            form.setError("password", { message: "" })
            form.setError("email", { message: "" })
            return
        }
        const { session } = response
        setSession(session)
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
                            <Input type="password" {...field} />
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