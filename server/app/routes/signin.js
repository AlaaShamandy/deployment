const Journalist = require('../models/journalist');

module.exports.routes = (router) => {
    router.post('/signin', (request, response) => {
        const { username, password } = {
            username: request.body.username,
            password: request.body.password,
        };

        console.log(request.body.username);
        console.log(request.body.password);

        Journalist.findByUsername(username, (error, journalist) => {
            if (error) {
                response.json({ ok: false, message: error.message });
            } else if (!journalist) {
                response.json({ ok: false, message: 'user is not signed up.' });
            } else if (journalist) {
                if (!journalist.validPassword(password)) {
                    response.json({ ok: false, message: 'incorrect password' });
                } else {
                    var token = journalist.generateToken();
                    /* Set up a cookie containing token for 1 hour */
                    response.cookie('Token', token, {maxAge : 3600000});
                    response.json({
                        ok: true,
                        message: 'good to go!',
                        token: token,
                        journalist: journalist,
                    });
                }
            }
        });
    });

    return router;
};
