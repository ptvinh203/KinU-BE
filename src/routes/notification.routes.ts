import { NotificationController } from './../controllers/notification.controller';
import express from "express"

const router = express.Router()

router.get("/all", NotificationController.getNotificationByUserId)
router.get("/read", NotificationController.getReadNotification)
router.get("/unread", NotificationController.getUnReadNotification)
router.put("/read-all", NotificationController.setReadAllNotification)
router.put("/:id/read", NotificationController.setReadNotification)

export default router