const express = require('express');
const mongoose = require('mongoose');
const User = require('./../models/user');

const router = express.Router();

router.get('/getUsers', (request, response) => {
    User.find((error, data) => {
        if(error) {
            response.send(error);
        }

        res.setHeader('Content-Type', 'application/json');
        response.status(201).send(data);

    });
});

module.exports = router;