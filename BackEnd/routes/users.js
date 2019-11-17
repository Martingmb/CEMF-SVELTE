const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./../models/user');

const router = express.Router();

router.get('/getUsers', (request, response) => {
    User.find((error, data) => {
        if(error) {
            response.send(error);
        }

        response.setHeader('Content-Type', 'application/json');
        response.status(201).send(data);

    });
});

router.post('/createMaestro', (request, response) => {
    let {username, password, name, title, type, clase} = request.body;
    console.log(username, password, name, title, type, clase);
    User.register(new User({
        username: username.toLowerCase(),
        password: password,
        name: name,
        title: title,
        type: type,
        clase: clase
    }), request.body.password, (err, user) => {
        if (err) {
            response.statusCode = 500;
            response.setHeader('Content-Type', 'application/json');
            response.json({
                err: err
            });
        } 
        passport.authenticate('local')(request, response, function () {
            response.json({
                message: "Created successfully"
            })
        });
    });
});

module.exports = router;