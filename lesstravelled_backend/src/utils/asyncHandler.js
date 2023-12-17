const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}

export { asyncHandler }







// --------------------------------------------------------
/* 
another way   //todo this is how we do using try catch but if you have to do the same thing using the promises then how you will do that, that is defined above
const asyncHandler = (fn) => async (req, res, next) => {
    try{
        await fn(req, res, next)
    } catch(error) {
        res.status(err.code || 500).json({
            success : false,
            message : err.message
        })
    }
}   //here we have removed the {} and rest everything is same  [ it is explained below ]


// const asyncHandler = (func) => {
//     async () => {}
// }

//we can take func as parameter and now if i want to pass this 
// further down the road then we can do it as above
*/