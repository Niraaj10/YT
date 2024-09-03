import { Router } from 'express'
import { verfiyJWT } from '../middlewares/auth.mw.js'
import { upload } from '../middlewares/multer.mw.js'
import { getAllVideos, publishVideo } from '../controllers/video.controllers.js'

const router = Router()
router.use(verfiyJWT)

router.route('/').get(getAllVideos)

router.route("/uploadvideo").post(
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        },
    ]),
    publishVideo
)


export default router