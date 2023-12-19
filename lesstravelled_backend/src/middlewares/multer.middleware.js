import multer from "multer"; // use doc

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        //previously we have json data now we have file[multer] : or you can do file upload of express
        cb(null, "./public/temp")
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round
        (Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage,
})
 