import constants from "../constants";

const errorHandler = (err, req, res, next) => {
    const statusCode = req.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation failed",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not found",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "This request is forbidden",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.UNATHORIZED:
            res.json({
                title: "The request is unauthorized",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        default:
            console.log('There is no any error everything is good!')
            break;
    }
}

export default errorHandler