import { Router } from "express"
import * as controller from "../controllers/users.controller"
import { validateSchema, auth } from "../middlewares"
import { CreateUserSchema, UpdateUserSchema } from "../schemas/user.schema"

const router = Router()

router.get("/", [auth], controller.getAllUsers)
router.get("/:id", [auth], controller.getUserById)
router.post("/", [auth, validateSchema(CreateUserSchema)], controller.createUser)
router.put("/:id", [auth, validateSchema(UpdateUserSchema)], controller.updateUser)
router.delete("/:id", [auth], controller.deleteUser)

export default router