import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from '../models/user.models.js';
import { Subscription } from "../models/subscription.models.js";
import mongoose from 'mongoose';




const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    if (!channelId) throw new ApiError(400, "Provide ChannelId");

    const isChannel = await User.findById(channelId);

    if (!isChannel) throw new ApiError(400, "Channel not found");

    const checkSub = await Subscription.findOne({
        subscriber: req.user?._id,
        channel: channelId,
    });

    if (checkSub) {
        const removeSub = await Subscription.findByIdAndDelete(checkSub._id);

        if (!removeSub) throw new ApiError(500, "Failed to toggle Subscription");

        let totalSubs = await Subscription.countDocuments({ channel: isChannel });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { removeSub, totalSubs },
                    "Unsubscribed successfully"
                )
            );

    } else {
        const newSub = await Subscription.create({
            subscriber: req.user?._id,
            channel: channelId,
        });

        if (!newSub) throw new ApiError(500, "Failed to toggle Subscription");

        let totalSubsChannels = await Subscription.countDocuments({ channel: isChannel });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { newSub, totalSubsChannels },
                    "Subscribed successfully"
                )
            );
    }

});



const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params; 

    if (!subscriberId) throw new ApiError(400, "Provide ChannelId");

    const isUser = await User.findById(subscriberId);

    if (!isUser) throw new ApiError(400, "Channel not found");

    const subscribers = await Subscription.aggregate([
        {
            $match: {
                channel: new mongoose.Types.ObjectId(subscriberId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "subscriber",
                foreignField: "_id",
                as: "subscriberDetails",
                pipeline: [
                    {
                        $project: {
                            fullname: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            },
        },
    ])


    let totalSubs = await Subscription.countDocuments({ channel: isUser });

    return res
    .status(200)
    .json(
        new ApiResponse(
                    200,
                    { subscribers, totalSubs },
                    "Channel Subs Details"
        )
    );
})



const getSubsribedChannel = asyncHandler(async (req, res) => {
    const { channelId } = req.params; // Channel Id === req.user

    if (!channelId) throw new ApiError(400, "Provide ChannelId");

    const isChannel = await User.findById(channelId);

    if (!isChannel) throw new ApiError(400, "Channel not found");

    const Channels = await Subscription.aggregate([
        {
            $match: {
                subscriber: new mongoose.Types.ObjectId(channelId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "subscriber",
                foreignField: "_id",
                as: "subscriberDetails",
                pipeline: [
                    {
                        $project: {
                            fullname: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            },
        },
    ])


    let totalSubs = await Subscription.countDocuments({ subscriber: isChannel });

    return res
    .status(200)
    .json(
        new ApiResponse(
                    200,
                    { Channels, totalSubs },
                    "Subscribed Channel Details"
        )
    );
})


// const 



export {
    toggleSubscription,
    getSubsribedChannel,
    getUserChannelSubscribers
}