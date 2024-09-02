import { Router } from 'express'
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage } from '../controllers/user.controllers.js'
import { upload } from '../middlewares/multer.mw.js'
import { verfiyJWT } from '../middlewares/auth.mw.js'


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route('/login').post(loginUser)

// secured routes
router.route('/logout').post(verfiyJWT, logoutUser)
router.route('/refreshtoken').post(refreshAccessToken)
router.route('/changepassword').post(verfiyJWT, changeCurrentPassword)
router.route('/currentuser').get(verfiyJWT, getCurrentUser)
router.route('/updateuser').patch(verfiyJWT, updateAccountDetails)

router.route('/updateavatar').patch(verfiyJWT, upload.single("avatar"), updateUserAvatar)
router.route('/updatecoverimage').patch(verfiyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route('/channel/:username').get(verfiyJWT, getUserChannelProfile)
router.route('/history').get(verfiyJWT, getWatchHistory)



export default router