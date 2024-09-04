import { Router } from "express";
import { verfiyJWT } from "../middlewares/auth.mw.js";
import { addComment } from "../controllers/comment.controllers.js";

const router = Router()

router.use(verfiyJWT)

router.route('/addcomment/:videoId').post(addComment)


export default router