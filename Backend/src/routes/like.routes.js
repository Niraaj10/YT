import { Router } from "express";
import { verfiyJWT } from "../middlewares/auth.mw.js";
import { toggleVideoLike } from "../controllers/like.controllers.js";


const router = Router()
router.use(verfiyJWT)


router.route("/toggle/v/:videoId").post(toggleVideoLike);



export default router