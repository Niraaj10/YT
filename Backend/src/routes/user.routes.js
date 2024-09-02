import { Router } from 'express'
import { loginUser, logoutUser, registerUser } from '../controllers/user.controllers.js'
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



export default router