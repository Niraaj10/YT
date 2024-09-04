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

        let totalSubs = await Subscription.countDocuments({ channel: isChannel });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { newSub, totalSubs },
                    "Subscribed successfully"
                )
            );
    }

});



const getSubsribedChannel = asyncHandler(async (req, res) => {
    const { channelId } = req.params; // Channel Id === req.user

    if (!channelId) throw new ApiError(400, "Provide ChannelId");

    const isChannel = await User.findById(channelId);

    if (!isChannel) throw new ApiError(400, "Channel not found");

    const subscribers = await Subscription.aggregate([
        {
            $match: {
                channel: new mongoose.Types.ObjectId(channelId),
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


    let totalSubs = await Subscription.countDocuments({ channel: isChannel });

    return res
    .status(200)
    .json(
        new ApiResponse(
                    200,
                    { subscribers, totalSubs },
                    "Subscribed Channel Details"
        )
    );
})



export {
    toggleSubscription,
    getSubsribedChannel
}