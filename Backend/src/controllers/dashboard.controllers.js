import { Subscription } from "../models/subscription.models.js"
import { User } from "../models/user.models.js"
import { Video } from "../models/video.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"



const getAllVideos = asyncHandler( async (req, res) => {
    // const videos = await Video.find({ isPublished: true }).sort({ createdAt: -1 })
    const { userId } = req.params

    if (!userId) throw new ApiError(404, "Please enter a userId")
    
    const isUser = await User.findById(userId)

    if (!isUser) throw new ApiError(404, "User not found")

    const allvideos = await Video.find({ isPublished: true, owner: userId}).sort({ createdAt: -1})

    if (!allvideos.length) throw new ApiError(404, "No videos found for this user")

    const totalSubs = await Subscription.countDocuments({
        channel: userId
    })


    const subscribedTo = await Subscription.countDocuments({
        subscriber: userId
    })


    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            { allvideos, totalSubs, subscribedTo },
            "All Videos fetched successfully"
        )
    )

})



const getChannelStats = asyncHandler(async (req, res) => {
    const { userId } = req.params

    if (!userId) throw new ApiError(404, "Please enter a userId")
    
    const isUser = await User.findById(userId)

    if (!isUser) throw new ApiError(404, "User not found")

    
    
    // const { userId } = req.user._id

    // const allvideos = await Video.find({ isPublished: true, owner: req.user._id}).sort({ createdAt: -1})
    const allvideos = await Video.find({ isPublished: true, owner: isUser._id}).sort({ createdAt: -1})

    if (!allvideos.length) throw new ApiError(404, "No videos found for this user")

    const totalVideos = allvideos.length

    const totalViews = allvideos.reduce((total, video) => total + video.views, 0);


    const totalSubs = await Subscription.countDocuments({
        channel: req.user._id
    })

    const subscribedTo = await Subscription.countDocuments({
        subscriber: req.user._id
    })



    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            { allvideos, totalSubs, subscribedTo, totalViews, totalVideos},
            "All Videos fetched successfully"
        )
    )

})



export {
    getAllVideos,
    getChannelStats
}