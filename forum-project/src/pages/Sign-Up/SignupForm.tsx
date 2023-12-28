import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

const SignupForm = () => {
    const [date, setDate] = useState<Date>()

    return (
        <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="name"> Name </Label>
                <Input id="name" type="text" autoComplete="no" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email"> Email </Label>
                <Input id="email" type="email" placeholder="m@example.com" autoComplete="no" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password"> Password </Label>
                <Input id="password" type="password" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password2"> Confirm Password </Label>
                <Input id="password2" type="password" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="birth"> Birth </Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        id="birth"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span> Pick a date </span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="gender"> Gender </Label>
                <Select>
                    <SelectTrigger id="gender">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male"> Male </SelectItem>
                        <SelectItem value="female"> Female </SelectItem>
                        <SelectItem value="other"> Other </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button> Create account </Button>
        </div>
    )
}

export default SignupForm

