const Journalist = require('../models/journalist');

module.exports.routes = (router) => {
    router.post('/signup', (request, response) => {
        const { body } = { body: request.body };

        Journalist.register({
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password,
            username: body.username

        }, (error, journalist) => {
            if (error) {
                response.json({ ok: false, message: error.message });
            } else {
                var token = journalist.generateToken();
                /* Set up a cookie containing token for 1 hour */
                response.cookie('Token', token, {maxAge : 3600000});
                response.json({
                    ok: true,
                    message: 'succefully signed up the user.',
                    token: token,
                });
            }
        });
    });

    return router;
};
