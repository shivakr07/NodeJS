import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateAccessandRefreshTokens = async (userId) => {
  //since we haveaccess of user so we can get userId easily
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    // now we have refresh token how to put in db

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    //easy since we have user
    // and saving user will also save the refreshtoken as well
    //note : while you save then other fields of mongoose also get kickin like password while here we are only updating the refreshtoken so we do this as we have done above
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens "
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from the frontend
  // validation  -not empty
  // check if user already exists [check using email or username which is unique]
  // check for images, check for avatar
  // upload them to clodinary, avatar
  // create user object - create entry in db[after file is uploaded on cloudinary via multer]
  // remove password and refresh token field from response
  // check for user creation
  // return response

  const { fullName, email, userName, password } = req.body;
  console.log("email : ", email);

  // if (fullName === "") {
  //     throw new ApiError(400, "fullname is required")
  // }

  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  // User can directly interact with db as it is from mongoose
  // User.findOne({email}) //or using opearators for more
  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or userName already exist ");
  }

  console.log(req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  //db entry : ans user is talking to db

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName: userName.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  ); // this tells whether user was created or not
  // but this is an extra db call

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a User");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

// Login
const loginUser = asyncHandler(async (req, res) => {
  //todos
  //req body -> data
  // username or email
  // find the user
  // password check
  //generate [access and refresh token]
  // send cookies [secure]

  const { email, username, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "username or email is required");
  }

  const user = User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist ");
  }
  //if user exist then let's check passoword if matching or not
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, " Invalid user credentials ");
  }
  //if user have valid password -> make access and refresh token and
  // since it used a lot so let's put this in the separate method
  const { refreshToken, accessToken } = 
  await generateAccessandRefreshTokens(user._id);

  //now we have refresh and access token and we will send in cookies
  // how we will do that ? 
  // what details we have to send
  // now we have to decide the whether db call is ecxpensive or not
  const loggedInUser = User.findById(user._id).select("-password -refreshToken")

  //now we will send the cookies
  const options = {
    httpOnly: true,
    secure: true    //  it means it is modifiable with server only
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
        200,
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "User logedIn successfully"
    )
  )

});

//todo : Logout user
const logoutUser = asyncHandler(async (req, res) => {
    //how to get email so that you can login
    //you can't give him form , otherwise he can logout anyone 
    // we have middlewares [we can create custom]
    //now we have user [ass we are coming from middleware]
    //now we have access of req.user [we added user using req.user while verifying the tokens ] and now we will del ref tokenn of user
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new : true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "User logged Out"))

})


export { 
    registerUser,
    loginUser,
    logoutUser
 };

// if we are talking here user then it's not User which is object of the mongoose so it will help to access all the functions of mongoose provide
// here user is actual user [db user]and all those method which we have made is available to this user [like generate token,ispasswordcorrect ...]
