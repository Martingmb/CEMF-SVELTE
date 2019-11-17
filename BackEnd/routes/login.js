const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./../models/user');
// const { DATABASE_URL, PORT } = require('../../config');

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {

    console.log(req.body);

    User.findOne({
        username: String(req.body.username).toLowerCase(),
        password: String(req.body.password).toLowerCase()
    }, (err, person) => {

        let response = {
            login: false,
            person: person
        }

        if(err) {
            res.sendStatus(response);
        }

        res.setHeader('Content-Type', 'application/json');
        req.session.type = person.type;
        response.login = true;
        if (req.session.type == 'Maestro') {
            req.session.person = person;
            console.log(response);
            res.status(201).send(response);
        } else {
            req.session.person = person;
            console.log(response);
            res.status(201).send(response);
        }
    });

    

});

module.exports = router;