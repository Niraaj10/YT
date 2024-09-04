import { Comment } from "../models/comments.models.js"
import { Like } from "../models/like.models.js"
import { Tweet } from "../models/tweet.models.js"
import { Video } from "../models/video.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import mongoose from "mongoose"
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

})




const toggleCommentLike = asyncHandler( async (req, res) => {
    const { commentId } = req.params
    const user = req.user._id

    if(!commentId) throw new ApiError(404, "Please provide valid comment id")

    const isComment = await Comment.findById(commentId)

    if(!isComment) {
        throw new ApiError(404, "Comment not found")
    }

    const islikedComment = await Like.findOne({
        comment: isComment._id,
        likedBy: user
    })

    
    if(islikedComment) {
        const deleteLike = await Like.findOneAndDelete({
            _id: islikedComment._id,
        })
        
        if(!deleteLike) throw new ApiError(404, "Error while deleting like on comment")
            
        let totalLikes = await Like.countDocuments({ comment: isComment._id });
        
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
            comment: isComment._id,
            likedBy: user
        })
        
        if(!newLike) throw new ApiError(500, "Error while creating new like on comment")
            
        let totalLikes = await Like.countDocuments({ comment: isComment._id });
        
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

})




const toggleTweetLike = asyncHandler( async (req, res) => {
    const { tweetId } = req.params
    const user = req.user._id

    if(!tweetId) throw new ApiError(404, "Please provide valid video id")

    const isTweet = await Tweet.findById(tweetId)

    if(!isTweet) {
        throw new ApiError(404, "Video not found")
    }

    const islikedTweet = await Like.findOne({
        tweet: isTweet._id,
        likedBy: user
    })

    
    if(islikedTweet) {
        const deleteLike = await Like.findOneAndDelete({
            _id: islikedTweet._id,
        })
        
        if(!deleteLike) throw new ApiError(404, "Error while deleting like on video")
            
        let totalLikes = await Like.countDocuments({ tweet: tweetId });
        
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
            tweet: isTweet._id,
            likedBy: user
        })
        
        if(!newLike) throw new ApiError(500, "Error while creating new like on video")
            
        let totalLikes = await Like.countDocuments({ tweet: tweetId });
        
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

})



const getlikedVideo = asyncHandler( async(req, res) => {
    const userId = req.user?._id

    const likedVideo = await Like.aggregate([
        {
            $match: {
                video: { $ne: null },
                likedBy: new mongoose.Types.ObjectId(req.user._id),
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "likedVidoes",
                pipeline: [
                    {
                        $project: {
                            title: 1,
                            description: 1,
                            thumbnail: 1,
                            duration: 1,
                            createdAt: 1,
                            likes: 1,
                            views: 1, 
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                likedVidoes: {
                $first: "$likedVidoes"
               } 
            }
        }
        
    ])

    if(!likedVideo) throw new ApiError(404, "No liked videos found")
    
    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            { likedVideo },
            "Liked videos fetched successfully"
        )
    )
}) 




export {
    toggleVideoLike,
    toggleTweetLike,
    toggleCommentLike,
    getlikedVideo
}