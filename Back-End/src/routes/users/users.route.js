import { Router } from "express"
import { authenticateToken, authorizeRoles } from "../../middlewares/safety/auth.middleware.js"
import { deleteUserController, getUserController, getUsersController, updateUserController, changeProfilePictureController, changeStatusController } from "../../modules/users/users.controller.js"

const router = Router()

router.get('/', authenticateToken, getUsersController)

router.get('/:id', authenticateToken, getUserController)

router.put('/:id', authenticateToken, updateUserController)

router.put('/:id/picture', authenticateToken, changeProfilePictureController)

router.put('/:id/status', authenticateToken, changeStatusController)

router.delete('/:id', authenticateToken, deleteUserController)

export default router