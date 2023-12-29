import { Router } from "express"
import * as controller from "../controllers/users.controller"
import { validateUserSchema } from "../middlewares"
import { LoginUserSchema } from "../schemas/login.schema"

const router = Router()

router.post("/", [validateUserSchema(LoginUserSchema)], controller.loginUser)

export default router