const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Clase = require('../models/clase');

router.post('/reporteSemanal', (req, res, next) => {

    new Promise((resolve, reject) => {
        let clase = {
            alumnos: req.body.asistencia,
            maestro: req.body.id,
            fecha: req.body.fecha,
            biblias: req.body.biblias,
            expositores: req.body.expositores,
            capitulosLeidos: req.body.capitulos,
            ofrenda: req.body.ofrenda,
            visitantes: req.body.visitantes,
            clase: req.body.clase
        }

        Clase.create(resolve, reject, clase);
    }).then(() => {
        res.sendStatus(201);
    }).catch(err => {
        if(err) {
            throw err;
        }
        res.send(400);
    })

})

module.exports = router;