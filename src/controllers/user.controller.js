import { User } from "../models/user.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user info from frontend
    // validaation
    // check if user already exists - username, email
    // check for images, avatar
    // upload them to cloudinary
    // create user object - create entry in DB
    // remove password and refresh token from response
    // check for user creation
    // return res

    const {fullname, email, username, password} = req.body
    console.log(req,body);

    if([fullname, username, email, password].some((field) => field?.trim() === "")) {
        throw new APIError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })
    console.log(existedUser);
    
    if(existedUser) {
        throw new APIError(409, "User with username/email already exists!")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    console.log(req.files);
    
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath) {
        throw new APIError(400, "Avatar file is required")
    }

    const uploadAvatar = await uploadOnCloudinary(avatarLocalPath)
    const uploadCoverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!uploadAvatar) {
        throw new APIError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullname,
        email,
        password,
        username: username.toLowerCase(),
        avatar: uploadAvatar.url,
        coverImage: uploadCoverImage?.url || "",
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new APIError(500, "Something went wrong while registering the user.")
    }

    return res.status(201).json(
        new APIResponse(200, createdUser, "User registered successfully!")
    )
})

export {registerUser}