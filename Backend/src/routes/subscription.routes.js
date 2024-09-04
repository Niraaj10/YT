import { Router } from 'express'
import { verfiyJWT } from '../middlewares/auth.mw.js'
import { getSubsribedChannel, getUserChannelSubscribers, toggleSubscription } from '../controllers/subscription.controllers.js'

const router = Router()
router.use(verfiyJWT)


router.route('/:channelId').post(toggleSubscription).get(getSubsribedChannel)

router.route('/subs/:subscriberId').get(getUserChannelSubscribers)




export default router