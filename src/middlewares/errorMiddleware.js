const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 400;
        message = "Invalid Id"
    }

    res.status(statusCode).json({
        status: statusCode,
        message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    })
}

module.exports = { notFound, errorHandler }