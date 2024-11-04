import { NotificationController } from './../controllers/notification.controller';
import express from "express"

const router = express.Router()

router.get("/", NotificationController.getNotificationByUserId)
router.put("/read-all", NotificationController.setReadAllNotification)
router.put("/:id/read", NotificationController.setReadNotification)

export default router