const express = require('express');
const router = express.Router();
const moment = require('moment');
const mongoose = require('mongoose');
const clase = require('../models/clase');
const aseo = require('../models/aseo');

router.get('/ofrenda', (req, res, next) => {
    new Promise((resolve, reject) => {
        let startDate = moment().day(0);
        clase.getWithDate(resolve, reject, startDate);

    }).then(data => {
        res.json(data);
    }).catch(err => {
        if(err) {
            throw err;
        }  
    });
});

router.get('/aseo', (req, res, next) => {
    new Promise((resolve, reject) => {
        let startDate = moment().day(0).format();
        aseo.getWithDate(resolve, reject, startDate);
    }).then(data => {
        res.json(data);
    }).catch(err => {
        if(err) {
            throw err;
        }
    });
});



module.exports = router;