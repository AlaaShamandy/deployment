const jwt = require('express-jwt');

const Report = require('../models/report');
const Journalist = require('../models/journalist');

const secret = require('../../lib/secret');

const authenticate = jwt({
    secret: secret.value,
    userProperty: 'payload',
});

module.exports.routes = (router) => {
    router.get('/reports', (request, response) => {
        var username = request.query.username;

        Journalist.findByUsername(username, (error, journalist) => {
            if (error) {
                response.json({ ok: false, message: error.message });
            } else {
                Report.findByUserId(journalist._id, (error, reports) => {
                    if (error) {
                        response.json({ ok: false, message: error.message });
                    } else {
                        response.json({
                            ok: true,
                            message: "successfully retrievied the user reports",
                            result: reports
                        });
                    }
                });
            }
        });
    });

    router.post('/reports', authenticate, (request , response) => {
        var mediaUrl = request.body.mediaUrl;
        var text = request.body.text;
        var journalistId = request.payload.id;

        Report.saveReport({
            journalistId: journalistId,
            mediaUrl: mediaUrl,
            text: text

        }, (error) => {
            if (error) {
                response.json({ ok: false, message: error.message });
            } else {
                response.json({
                    ok: true,
                    message: "successfully saved the report"
                });
            }
        });
    });

    return router;
}
