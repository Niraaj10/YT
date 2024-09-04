import { Router } from "express";
import { verfiyJWT } from "../middlewares/auth.mw.js";
import { getAllVideos, getChannelStats } from "../controllers/dashboard.controllers.js";

const router = Router()

router.use(verfiyJWT)


router.route('/channelvideos/:userId').get(getAllVideos)
router.route('/channelstats').get(getChannelStats)




export default router