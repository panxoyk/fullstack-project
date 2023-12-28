import * as z from "zod"

export const accountFormSchema = z.object({
    name: z
        .string({
            required_error: "A name is required."
        })
        .min(1, {
            message: "Name must be at least 2 characters.",
        }),
    birth: z
        .date({
            required_error: "A date of birth is required.",
        }),
    gender: z
        .string({
            required_error: "A gender is required."
        })
})

export type AccountFormValues = z.infer<typeof accountFormSchema>
