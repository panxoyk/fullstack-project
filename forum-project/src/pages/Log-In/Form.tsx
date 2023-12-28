import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoginValues, resolver } from "./login"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { loginUser } from "@/services/user.service"

const LoginForm = () => {
    const form = useForm<LoginValues>({
        resolver,
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (data: LoginValues) => {
        const res = await loginUser(data)
        console.log(res)
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
                            <Input {...field} />
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