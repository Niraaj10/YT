import { Video } from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudi } from "../utils/cloudinary.js";



const getAllVideos = asyncHandler(async (req, res) => {
    // const videos = await Video.find({ isPublished: true }).sort({ createdAt: -1 })

    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query

    //get Videos without User details

    // const searchObj = {}
    // if (query) {
    //     searchObj.$or = [
    //         { title: { $regex: query, $options: "i" } },
    //         { description: { $regex: query, $options: "i" } }
    //     ];
    // }
    // console.log(searchObj)

    // const sortObj = {}
    // sortObj[sortBy] = sortType === 'asc' ? -1 : 1

    // const searchedVideos = await Video.find(searchObj)
    // .sort(sortObj)
    // .skip((page - 1) * limit)
    // .limit(limit)

    // console.log(searchedVideos)



   



    // Video with user details using aggregation pipelines

    const pipeline = []

    if (query) {
        pipeline.push({
            $match: {
                $or: [
                    { title: { $regex: query, $options: "i" } },
                    { description: { $regex: query, $options: "i" } }
                ]
            }
        })
    }

    //for owner details
    pipeline.push(
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
            },
        },
        {

            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }

        }
    )

    //for pagination and sorting
    pipeline.push(
        {
            $sort: {
                [sortBy]: sortType === "asc" ? 1 : -1
            }
        },
        {
            $skip: (parseInt(page) - 1) * parseInt(limit)
        },
        {
            $limit: parseInt(limit)
        }
    )

    // console.log(pipeline)


    const AllVidoes = await Video.aggregate(pipeline)


     res
    .status(201)
    .json(
        new ApiResponse(
            200,
            "All videos fetched successfully",
            {AllVidoes}
        )
    )

})



const publishVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (
        [title, description].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const videoLocalPath = req.files?.videoFile[0]?.path
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path

    if (!videoLocalPath && !thumbnailLocalPath) {
        throw new ApiError(400, "Please provide video file and thumbnail")
    }

    const videoFile = await uploadOnCloudi(videoLocalPath)
    const thumbnail = await uploadOnCloudi(thumbnailLocalPath)

    if (!videoFile && !thumbnail && !videoFile.url && thumbnail.url) {
        throw new ApiError(400, "video file and thumbnail is required")
    }

    const videoDuration = videoFile.duration

    const video = await Video.create({
        title,
        description,
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        isPublished: true,
        owner: req.user?._id,
        duration: videoDuration,
    })

    if (!video) {
        throw new ApiError(500, "Something went wrong while uploading video ")
    }

    res
        .status(201)
        .json(
            new ApiResponse(200, video, "Video uploaded Successfully")
        )
})



const getVideoById = asyncHandler( async (req, res) => {
    const { videoId }= req.params

    if(!videoId) {
        throw new ApiError(404, "Provide correct Video ID")
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    res
    .status(201)
    .json(
        new ApiResponse(
            200,
            {video},
            "Video fetched successfully"
        )
    )
})



const deleteVideo = asyncHandler( async (req, res) => {
    const { videoId }= req.params

    if(!videoId) {
        throw new ApiError(404, "Provide correct Video ID")
    }

    const video = await Video.findByIdAndDelete(videoId)

    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    res
    .status(201)
    .json(
        new ApiResponse(
            200,
            {video},
            "Video deleted successfully"
        )
    )
})



export {
    publishVideo,
    getAllVideos,
    getVideoById,
    deleteVideo
} 