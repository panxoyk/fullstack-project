import { Router } from "express"
import usersRouter from "./users.routes"
import loginRouter from "./login.routes"

const router = Router()

router.use("/users", usersRouter)
router.use("/login", loginRouter)

export default router