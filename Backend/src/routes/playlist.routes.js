import { Router } from 'express';
import { verfiyJWT } from '../middlewares/auth.mw.js';
import { createPlaylist, getuserPlaylist } from '../controllers/playlist.controllers.js';

const router = Router()

router.use(verfiyJWT)

router.route('/createplaylist').post(createPlaylist)

router.route('/userplaylists/:userId').get(getuserPlaylist)

export default router