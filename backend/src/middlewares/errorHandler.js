

export const errorHandler = (err, req, res, next) => {

    console.log("err", err)


    if (process.env.NODE_ENV === "development") {

    }

    // get status code else default set up
    const statusCode = err.statusCode || 500
    // get message else default msg
    const message = err.message || "Internal Server Error";

    // res error , in devlopment res stack ( error full details )
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });

    // allow the next operation 
    next()
}