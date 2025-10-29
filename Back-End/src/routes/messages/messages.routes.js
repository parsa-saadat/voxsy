import { Router } from "express"

import { authenticateToken } from "../../middlewares/safety/auth.middleware.js"
import { deleteMessageController, editMessageController, getMessagesController, seenMessageController, sendMessageController } from "../../modules/messages/messages.controller.js"

const router = Router()

router.post('/send/:userId', authenticateToken, sendMessageController)

router.put('/:id/seen', authenticateToken, seenMessageController)

router.get('/:userId', authenticateToken, getMessagesController)

router.put('/:id', authenticateToken, editMessageController)

router.delete('/:id', authenticateToken, deleteMessageController)

export default router