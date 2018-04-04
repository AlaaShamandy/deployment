const jwt = require('express-jwt');

const Report = require('../models/report');
const Journalist = require('../models/journalist');

const secret = require('../../lib/secret');
const utils = require('../../lib/utils');

const authenticate = jwt({
    secret: secret.value,
    userProperty: 'payload',
});

module.exports.routes = (router) => {
    router.get('/profile', (request, response) => {
        var query = request.query;
        var username = Object.keys(query).length === 0?
                       request.payload.username:
                       query.username;

        console.log(Object.keys(query).length === 0);
        Journalist.findByUsername(username, (error, journalist) => {
            if (error) {
                response.json({ ok: false, message: error.message });
            } else {
                if (!journalist) {
                    response.json({
                        ok: true,
                        message: "user is not signed up.",
                    });

                } else {
                    Report.findByUserId(journalist._id, (error, reports) => {
                        if (error) {
                            response.json({ ok: false, message: error.message });
                        } else {
                            console.log(username);
                            response.json({
                                ok: true,
                                message: "successfully retrievied the user profile",
                                result: {
                                    username: username,
                                    reports, reports,
                                    loggedin: username == request.payload.username
                                }
                            });
                        }
                    });
                }
            }
        });
    });

    return router;
};
