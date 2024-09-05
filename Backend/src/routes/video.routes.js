import { Router } from 'express'
import { verfiyJWT } from '../middlewares/auth.mw.js'
import { upload } from '../middlewares/multer.mw.js'
import { deleteVideo, getAllVideos, getVideoById, publishVideo, togglePublishStatus, updateVideoDetails, viewCount,  } from '../controllers/video.controllers.js'

const router = Router()
// router.use(verfiyJWT)

router.route('/').get(getAllVideos)

router.route("/uploadvideo").post(
    verfiyJWT,
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


router.route("/:videoId").get(verfiyJWT, getVideoById).delete(verfiyJWT, deleteVideo).patch(verfiyJWT, upload.single("thumbnail"), updateVideoDetails);

router.route("/togglepublish/:videoId").patch(verfiyJWT, togglePublishStatus)
router.route("/viewcount/:videoId").patch(verfiyJWT, viewCount)

export default router