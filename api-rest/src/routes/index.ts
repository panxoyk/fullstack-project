import { Router } from "express"
import usersRouter from "./users.routes"
import authRouter from "./auth.routes"

const router = Router()

router.use("/users", usersRouter)
router.use("/auth", authRouter)

export default router