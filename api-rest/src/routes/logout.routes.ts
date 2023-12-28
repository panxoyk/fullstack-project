import { Router } from "express"
import * as controller from "../controllers/users.controller"
import { auth } from "../middlewares/middlewares"

const router = Router()

router.post("/", [auth], controller.logoutUser)

export default router