//wrapper fn with try/catch

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn();
//     } catch (error) {
//         // console.error(error);
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// }


//wrapper fn with promise

const asyncHandler = (reqHandler) => {
    (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next))
        .catch((err) => next(err))
    }
}


export { asyncHandler }