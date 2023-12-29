import { Router } from "express"
import * as controller from "../controllers/users.controller"
import { validateUserSchema } from "../middlewares"
import { CreateUserSchema } from "../schemas/user.schema"

const router = Router()

router.post("/", [validateUserSchema(CreateUserSchema)], controller.createUser)

export default router