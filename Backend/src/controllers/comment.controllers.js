import { Comment } from "../models/comments.models.js"
import { Video } from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"


const addComment = asyncHandler( async (req, res) => {
    const { videoId } = req.params
    const { content } = req.body

    if (!videoId) throw new ApiError(404, "Please provide video ID")
    if (!content) throw new ApiError(400, "Please provide content")
    
    const videocheck = await Video.findById(videoId)

    if(!videocheck) throw new ApiError(404, "Please provide valid video ID")

    const comment = await Comment.create({
        content,
        owner: req.user._id,
        video: videocheck._id
    })

    if(!comment) throw new ApiError(404, "Error while creating comment")

    res
    .status(201)
    .json(
        new ApiResponse(
            200,
            { comment },
            "Comment created successfully"
        )
    )
})



export {
    addComment
 }