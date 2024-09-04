import { Like } from "../models/like.models.js"
import { Video } from "../models/video.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"




const toggleVideoLike = asyncHandler( async (req, res) => {
    const { videoId } = req.params
    const user = req.user._id

    if(!videoId) throw new ApiError(404, "Please provide valid video id")

    const isVideo = await Video.findById(videoId)

    if(!isVideo) {
        throw new ApiError(404, "Video not found")
    }

    const islikedvideo = await Like.findOne({
        video: videoId,
        likedBy: user
    })

    
    if(islikedvideo) {
        const deleteLike = await Like.findOneAndDelete({
            _id: islikedvideo._id,
        })
        
        if(!deleteLike) throw new ApiError(404, "Error while deleting like on video")
            
        let totalLikes = await Like.countDocuments({ video: videoId });
        
        res
        .status(201)
        .json(
            new ApiResponse(
                200,
                { deleteLike, "totalLikes: " : totalLikes},
                "Like removed successfully"
            )
        )
    } else {
        const newLike = await Like.create({
            video: videoId,
            likedBy: user
        })
        
        if(!newLike) throw new ApiError(500, "Error while creating new like on video")
            
        let totalLikes = await Like.countDocuments({ video: videoId });
        
        res
        .status(201)
        .json(
            new ApiResponse(
                200,
                { newLike, "totalLikes: " : totalLikes },
                "Like added successfully"
            )
        )
    }

    // res
    //     .status(201)
    //     .json(
    //         new ApiResponse(
    //             200,
    //             {totalLikes },
    //             "Like added successfully"
    //         )
    //     )

})




export {
    toggleVideoLike
}