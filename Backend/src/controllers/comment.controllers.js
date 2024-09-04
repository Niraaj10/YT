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



const getVideoComments = asyncHandler( async (req, res) => {
    const { videoId } = req.params
    const { page = 1, limit = 10} = req.query

    if (!videoId) throw new ApiError(404, "Please provide video ID")

    const videocheck = await Video.findById(videoId)
    
    if(!videocheck) throw new ApiError(404, "Please provide valid video ID")
    
    const comments = await Comment.aggregate([
        {
            $match:{
                video: videocheck._id
            }
        }
    ])

    if(!comments) throw new ApiError(404, "No comments found")

    res
    .status(201)
    .json(
        new ApiResponse(
            200,
            { comments },
            "Comments fetched successfully"
        )
    )
})


const updatedComment = asyncHandler( async (req, res) => {
    const { commentId } = req.params
    const { content } = req.body

    if(!content) throw new ApiError(404, "Please provide a content")
    if (!commentId) throw new ApiError(404, "Please provide comment ID")

    const comment = await Comment.findByIdAndUpdate(
        commentId,
        {
            content
        },
        { new: true }
    )

    if(!comment) throw new ApiError(404, "Comment not found")

    res
    .status(201)
    .json(
        new ApiResponse(
            200,
            { comment },
            "Comment updated successfully"
        )
    )
})




const deleteComment = asyncHandler( async (req, res) => {
    const { commentId } = req.params

    if (!commentId) throw new ApiError(404, "Please provide comment ID")

    const comment = await Comment.findByIdAndDelete(commentId)

    if(!comment) throw new ApiError(404, "Comment not found")

    res
    .status(201)
    .json(
        new ApiResponse(
            200,
            { comment },
            "Comment deleted successfully"
        )
    )
})



export {
    addComment,
    getVideoComments,
    updatedComment,
    deleteComment
 }