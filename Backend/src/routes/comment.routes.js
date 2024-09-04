import { Router } from "express";
import { verfiyJWT } from "../middlewares/auth.mw.js";
import { addComment, deleteComment, getVideoComments, updatedComment } from "../controllers/comment.controllers.js";

const router = Router()

router.use(verfiyJWT)

router.route('/:videoId').post(addComment).get(getVideoComments)
router.route('/comm/:commentId').patch(updatedComment).delete(deleteComment)


export default router