import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
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

export default router;


// now you know how to inject middlewares : jo bhi method execute ho raha hai just uske pehle middleware inject kar do 
// now we are able to send the images