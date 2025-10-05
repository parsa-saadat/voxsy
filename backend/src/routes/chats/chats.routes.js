import { Router } from "express";
import { authenticateToken } from "../../middlewares/safety/auth.middleware.js";
import { getChatListController } from "../../modules/chats/chats.controller.js";

const router = Router()

router.get('/', authenticateToken, getChatListController)

export default router