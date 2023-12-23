import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = new Router()

router.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "coverImage",
            maxCount : 1
        }
    ]),
    registerUser)
// router.route("/login").post(registerUser)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
//now if you want to logout but before we can inject middlewares before execution of logoutUser
//that's why we write next [as if we want to execute more than one thing then we need to use the next so that router should not be confused]


export default router;


// now you know how to inject middlewares : jo bhi method execute ho raha hai just uske pehle middleware inject kar do 
// now we are able to send the images