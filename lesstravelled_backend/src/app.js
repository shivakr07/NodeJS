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
app.use(express.static)
app.use(cookieParser())

export {app}