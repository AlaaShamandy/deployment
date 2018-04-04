module.exports = {
    /* Middlware handles the 404 (page not found) error and
     * passes it on to the handler */
    pageNotFoundHandler: (req, res, next) => {
        const err = new Error('The request URL is not found on this server.');
        err.status = 404;
        next(err);
    },

    /* Middlware handles any error comes it's way and responds
     * with the error status and error message. */
    handler: (err, req, res, next) => {
    // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        const status = err.status || 500;
        res.status(status);
        res.json({
            error: {
                status,
                message: err.message,
            },
        });
        next(err);
    },
};
