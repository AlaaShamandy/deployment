/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const secret = require('../../lib/secret');

/* Journalist schema defination */
const JournalistSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true},

    hash: String,
    salt: String,
});


JournalistSchema.methods.setPassword = function setPassword(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

JournalistSchema.methods.validPassword = function validPassword(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

JournalistSchema.methods.generateToken = function generateToken() {
    return jwt.sign({
        id: this._id,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName
    }, secret.value, { expiresIn: '1h' });
};

const Journalist = mongoose.model('Journalist', JournalistSchema);

/* CRUD functions for the schema defined above */
module.exports.register = (journalistInfo, callback) => {
    const journalist = new Journalist();
    journalist.firstName = journalistInfo.firstName;
    journalist.lastName = journalistInfo.lastName;
    journalist.username = journalistInfo.username;
    journalist.setPassword(journalistInfo.password);

    journalist.save((error, savedJournalist) => {
        callback(error, savedJournalist);
    });
};

module.exports.findAll = (callback) => {
    Journalist.find({}, (error, journalists) => callback(error, journalists));
};

module.exports.findByUsername = (username, callback) => {
    Journalist.findOne({ username }, (error, journalist) => {
        callback(error, journalist);
    });
};
