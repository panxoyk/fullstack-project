import { Router } from "express"
import * as controller from "../controllers/auth.controller"
import { validateSchema } from "../middlewares"
import { LoginSchema } from "../schemas/login.schema"
import { SignupSchema } from "../schemas/signup.schema"

const router = Router()

router.post("/login", [validateSchema(LoginSchema)], controller.login)

router.post("/signup", [validateSchema(SignupSchema)], controller.signup)

router.post("/logout", controller.logout)

export default router