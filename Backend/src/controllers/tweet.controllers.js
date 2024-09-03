import mongoose from "mongoose";
import { Tweet } from "../models/tweet.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";




const creatTweet = asyncHandler( async (req, res) => {
    const { content } = req.body

    if(!content) throw new ApiError(404, "Please provide content")

    const user = await User.findById(req.user._id).select("-password")

    if(!user) throw new ApiError(404, "User not found")

    const tweet = await Tweet.create({
        content,
        owner: req.user._id
    })

    if(!tweet) throw new ApiError(404, "Error while creating tweet")

    res
    .status(201)
    .json(
        new ApiResponse(
            200,
            { tweet },
            "Tweet created successfully"
        )
    )
})



const getUserTweet = asyncHandler( async(req, res) => {
    const { userId } = req.params

    if(!userId) throw new ApiError(404, "Please provide user ID")

    const user = await User.findById(userId)

    if(!user) throw new ApiError(404, "User not found please provide valid user ID")
    
    const userTweet = await Tweet.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(user._id)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            fullname: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        }
    ])

    if(!userTweet) throw new ApiError(404, "No Tweet found")


    res
    .status(201)
    .json(
        new ApiResponse(
            200,
            { userTweet },
            "User's Tweets fetched successfully"
        )
    )
})


const updateTweet = asyncHandler( async (req, res) => {
    const { tweetId } = req.params
    const { content } = req.body

    if(!content) throw new ApiError(404, "Please provide content")
    if(!tweetId) throw new ApiError(404, "Please provide tweet Id") 
    
    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        { content },
        { new: true }
    )

    if(!tweet) throw new ApiError(404, "Tweet not found")

    
    res
    .status(201)
    .json(
        new ApiResponse(
            200,
            { tweet },
            "Tweets updated successfully"
        )
    )
})



const deleteTweet = asyncHandler( async (req, res) => {
    const { tweetId } = req.params

    if(!tweetId) throw new ApiError(404, "Please provide tweet Id") 
    
    const tweet = await Tweet.findByIdAndDelete(tweetId)

    if(!tweet) throw new ApiError(404, "Tweet not found")

    
    res
    .status(201)
    .json(
        new ApiResponse(
            200,
            { tweet },
            "Tweets deleted successfully"
        )
    )
})



export {
    creatTweet,
    getUserTweet,
    updateTweet,
    deleteTweet
}