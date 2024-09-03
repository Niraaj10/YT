import { Router } from "express";
import { verfiyJWT } from "../middlewares/auth.mw.js";
import { creatTweet, deleteTweet, getUserTweet, updateTweet } from "../controllers/tweet.controllers.js";

const router = Router()

router.use(verfiyJWT)

router.route('/createtweet').post(creatTweet)

router.route("/usertweets/:userId").get(getUserTweet);

router.route('/:tweetId').patch(updateTweet).delete(deleteTweet)


export default router