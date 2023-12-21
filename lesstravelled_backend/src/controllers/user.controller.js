import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"


const registerUser = asyncHandler( async (req, res) => {
    // get user details from the frontend
    // validation  -not empty
    // check if user already exists [check using email or username which is unique]
    // check for images, check for avatar
    // upload them to clodinary, avatar
    // create user object - create entry in db[after file is uploaded on cloudinary via multer]
    // remove password and refresh token field from response
    // check for user creation 
    // return response 

    const {fullName, email, userName, password} = req.body;
    console.log("email : ", email);

    // if (fullName === "") {
    //     throw new ApiError(400, "fullname is required")
    // }

    if(
        [fullName, email, userName, password].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    // User can directly interact with db as it is from mongoose
    // User.findOne({email}) //or using opearators for more
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or userName already exist ")
    }

    console.log(req.files)

    const avatarLocalPath = req.files?.avatar[0]?.path ;
    const coverImageLocalPath = req.files?.coverImage[0]?.path ;

    if (!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    //db entry : ans user is talking to db

    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    ); // this tells whether user was created or not
    // but this is an extra db call

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering a User")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )


})


export { registerUser };
