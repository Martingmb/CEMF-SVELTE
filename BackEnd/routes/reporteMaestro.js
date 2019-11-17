const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const reporte = require('../models/reporte');

router.post('/reporteMaestro', (req, res, next) => {
    console.log(req.body);

    new Promise((resolve, reject) => {
        let data = {
            clase: req.body.clase,
            capitulosLeidos: req.body.capitulos,
            visita: req.body.visita,
            asistencia: req.body.asistencia,
            maestro: req.body.id,
            nombre: req.body.nombre,
            fecha: req.body.fecha
        }
        reporte.create(resolve, reject, data);
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        if(err) {
            throw err;
        }
        res.send(400);
    });

});

module.exports = router;