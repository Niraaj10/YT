import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.models.js';
import { uploadOnCloudi } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";


const registerUser = asyncHandler( async (req, res) => {
    // res.status(200).json({
    //     message: "OKKK"
    // })

    //STEPS FOR CREATING USER REGISTRATION FUNCTIONS
    //Get user details from frontend
    // validation checks - not empty
    //check if user is already exists: username || email
    //check for images, avatar, profile pics
    //upload them to cloudinary
    //create user object - create user entey in DB
    //remove password and refresh token field from response 
    //Check for user creation
    //return response

    const { username, email, password, fullname } = req.body
    // console.log("username: ", username)
    // console.log(req.files)

    //validation checks - not empty
    if (
        [username, email, password, fullname].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // User.findOne({username}) // basic approach for only one field
    // for mant fields
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    })

    if (existedUser) {
        throw new ApiError(409, "Username or email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    
    const avatar = await uploadOnCloudi(avatarLocalPath)
    const coverImage = await uploadOnCloudi(coverImageLocalPath)
    
    if(!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase(),
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select(
        // to remove this field
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})


export { registerUser } 