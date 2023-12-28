import { Router } from "express"
import * as controller from "../controllers/users.controller"
import { validateUserSchema, auth } from "../middlewares/middlewares"
import { CreateUserSchema, UpdateUserSchema } from "../schemas/user.schema"

const router = Router()

router.get("/", [auth], controller.getAllUsers)
router.get("/:id", [auth], controller.getUserById)
router.post("/", [validateUserSchema(CreateUserSchema), auth], controller.createUser)
router.put("/:id", [validateUserSchema(UpdateUserSchema), auth], controller.updateUser)
router.delete("/:id", [auth], controller.deleteUser)

export default router