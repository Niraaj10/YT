import { Router } from 'express'
import { verfiyJWT } from '../middlewares/auth.mw.js'
import { upload } from '../middlewares/multer.mw.js'
import { deleteVideo, getAllVideos, getVideoById, publishVideo, togglePublishStatus, updateVideoDetails, viewCount,  } from '../controllers/video.controllers.js'

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


router.route("/:videoId").get(getVideoById).delete(deleteVideo).patch(upload.single("thumbnail"), updateVideoDetails);

router.route("/togglepublish/:videoId").patch(togglePublishStatus)
router.route("/viewcount/:videoId").patch(viewCount)

export default router