import { Router } from "express";
import { verfiyJWT } from "../middlewares/auth.mw.js";
import { getlikedVideo, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controllers.js";


const router = Router()
router.use(verfiyJWT)


router.route("/toggle/v/:videoId").post(toggleVideoLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/toggle/t/:tweetId").post(toggleTweetLike);

router.route("/likedvideos").get(getlikedVideo)


export default router