import { Router } from 'express';
import { verfiyJWT } from '../middlewares/auth.mw.js';
import { addVideoToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, getuserPlaylist, removeVideoFromPlaylist, updatePlaylist } from '../controllers/playlist.controllers.js';

const router = Router()

router.use(verfiyJWT)

router.route('/createplaylist').post(createPlaylist)

router.route('/userplaylists/:userId').get(getuserPlaylist)

router.route('/addvideo/:playlistId/:videoId').patch(addVideoToPlaylist)
router.route('/removevideo/:playlistId/:videoId').patch(removeVideoFromPlaylist)

router
    .route("/:playlistId")
    .get(getPlaylistById)
    .patch(updatePlaylist)
    .delete(deletePlaylist);


export default router