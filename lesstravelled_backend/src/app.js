import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// MIDDLEWARES                                        
// app.use(cors()); //enough to work
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true
}))
//for json data aadan pradan
app.use(express.json({limit: "16kb"})) //initially we were using body-parser
//from url if we get data
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static('public'))
app.use(cookieParser())


//routes import

import userRouter from "./routes/user.routes.js"


//routes declaration
//initially when we didn't have controllers when we were writing all the things here
//like app.get(/) when we were not exporting router like this
// and since router are sagregated so to user router we need to get / use as middleware
//initially we were writing the routes and controllers here only

app.use("/api/v1/users", userRouter)
//todo how url will be : http://localhost:8000/api/v1/users/register

export {app}