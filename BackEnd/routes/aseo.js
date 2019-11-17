const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const aseo = require('../models/aseo');

router.post('/postaseo', (req, res, next) => {
    console.log(req.body);

    new Promise((resolve,reject) => {
        let data = {
            maestro: req.body.id,
            nombre: req.body.nombre,
            monto: req.body.aseo,
            clase: req.body.clase,
            fecha: req.body.fecha
        }
        aseo.create(resolve, reject, data);
    }).then(() => {
        res.sendStatus(201);
    }).catch(err => {
        if(err) {
            throw err;
        }
        res.sendStatus(400);
    });
});

module.exports = router;