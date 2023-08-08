export function errorHandler(err, req, res, next) {
    const status = err.status || 400
    console.log(err)
    console.log(err.stack)
    res.status(status).json(err.message)
}