import { Router } from "express"
import usersRouter from "./users.routes"
import loginRouter from "./login.routes"
import logoutRouter from "./logout.routes"

const router = Router()

router.use("/users", usersRouter)
router.use("/login", loginRouter)
router.use("/logout", logoutRouter)

export default router