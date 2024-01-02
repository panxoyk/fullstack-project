import { LoginValues } from "@/types"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { LoginSchema } from "@/schemas/login.schema"
import { login } from "@/services/auth.service"
import { useSessionStore } from "@/hooks/useSessionStore"
import { setTokenItem } from "@/utils/item/token"


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

    const onSubmit = async (values: LoginValues) => {
        const data = await login(values)
        const { accessToken } = data
        if (!accessToken) {
            form.setValue("email", "")
            form.setError("email", { message: ""} )
            form.setValue("password", "")
            form.setError("password", { message: ""} )
            return
        }
        setTokenItem(accessToken)
        setSession(accessToken)
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