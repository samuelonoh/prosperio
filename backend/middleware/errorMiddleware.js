import validationResult from 'express-validator'

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error)
}

//General error handling middleware
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404
        message = 'Resource not found'
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
};

//error handler for validation errors from express-validator
const validationErrorHandler = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    next();
}

export {
    notFound,
    errorHandler,
    validationErrorHandler,
}