import { Router } from "express"
import * as controller from "../controllers/users.controller"

const router = Router()

router.post("/", controller.logoutUser)

export default router