const Journalist = require('../app/models/journalist');

module.exports = {
    authorizeRequest: (request, response, callback) => {
        if (!request.payload.id || !request.payload.username) {
            response.status(404).json({
                ok: false,
                message: 'cannot access private resources',
            });
        } else {
            Journalist.findByUsername(request.payload.username, (error, journalist) => {
                if (error) {
                    response.status(404).json({
                        error: {
                            status: error.status,
                            message: error.message,
                        },
                    });
                } else if (!journalist) {
                    response.status(404).json({
                        ok: false,
                        message: 'currently no resources available',
                    });
                }
            });
        }
        callback(request, response);
    },
};
