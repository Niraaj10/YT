import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js';
import { Playlist } from "../models/playlist.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { User } from "../models/user.models.js";




const createPlaylist = asyncHandler( async (req, res) => {
    const { name, description } = req.body
    
    if( !name && !description ) {
        throw new ApiError(404, "Please provide name and description")
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id
    })

    if (!playlist) {
        throw new ApiError(500, "Something went wrong while creating the playlist");
    }

    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            { playlist },
            "Playlist created successfully"
        )
    )
})


const getuserPlaylist = asyncHandler( async (req, res) => {
    const { userId } = req.params

    // if (!userId) {
    //     throw new ApiError(404, "Please provide correct user")
    // }

    const checkUser = await User.findById(userId)

    if (!checkUser) {
        throw new ApiError(404, "Please provide correct user")
    }

    // const userPlaylistsfind = await Playlist.find({ owner: userId })
    // console.log(userPlaylistsfind)

    
    console.log('user : ', userId)

    const userPlaylists = await Playlist.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "videos",
                foreignField: "_id",
                as: "videos",
                pipeline:[
                    {
                        $project: {
                            thumbnail: 1,
                            title: 1,
                            duration: 1,
                            views: 1,
                            description: 1,
                        }
                    }
                ]
            }
        },
        // {
        //     $project: {
        //         name: 1,
        //         description: 1,
        //         owner: 1,
        //         videos: 1,
        //         createdAt: 1,
        //         thumbnail: {
        //             $first: "$videos.thumbnail"
        //         },
        //         videosCount: {
        //             $size: "$videos"
        //         },
        //     }
        // }
    ])


    // const userPlaylists = await Playlist.aggregate([
    //     {
    //         $match: {
    //              owner: "UserId" // giving empty [] beacuse of type   
    //             owner: new mongoose.Types.ObjectId(userId)
    //         }
    //     }
    // ]);



    console.log("Playlists : ",userPlaylists)

    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            { userPlaylists },
            "User Playlists fetched successfully"
        )
    )
}) 







export {
    createPlaylist,
    getuserPlaylist
}