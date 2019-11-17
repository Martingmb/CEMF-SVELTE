const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

let ClaseSchema = new Schema({
    alumnos: { type: Number, required: true },
    maestro: { type: Schema.Types.ObjectId, ref: 'Maestro', required: true },
    fecha: { type: Date, unique: true, required: true },
    biblias: { type: Number, required: true },
    expositores: { type: Number, required: true },
    capitulosLeidos: { type: Number, required: true },
    ofrenda: { type: Schema.Types.Decimal128, required: true },
    visitantes: { type: Number, required: true },
    clase: { type: String, unique: false, required: true, trim: false }
});

const Clase = mongoose.model("Clase", ClaseSchema);

const Clases = {
    get: function(resolve, reject) {
        Clase.find()
            .then(clases => {
                resolve(clases);
            })
            .catch(err => {
                reject(err);
            });
    },

    getOne: function(resolve, reject, ClaseId) {
        Clase.findById(ClaseId)
            .then(clase => {
                resolve(clase);
            })
            .catch(err => {
                reject(err);
            });
    },

    create: function(resolve, reject, newClase) {
        Clase.create(newClase)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    },

    update: function(resolve, reject, ClaseId, updatedClase) {
        Clase.findByIdAndUpdate(ClaseId, { $set: updatedClase }, { new: true })
            .then(result => {

                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    },

    delete: function(resolve, reject, ClaseId) {
        Clase.findByIdAndDelete(ClaseId)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    },

    getWithDate: (resolve, reject, date) => {
        console.log("Date: ", date);
        let newDate = new Date(date);
        console.log('New Date: ', newDate);
        let startOf = moment(newDate).startOf('day');
        let endOf = moment(newDate).endOf('day');
        console.log("Start Date: ", startOf, " End Date: ", endOf);

        Clase.find({
            fecha: {
                $gte: startOf,
                $lt: endOf
            }
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    },

    getWithinRange: (resolve, reject, startDate, endDate) => {
        let nStart = new Date(startDate);
        let nEnd = new Date(endDate);
        let startOf = moment(nStart).startOf('day').format();
        let endOf = moment(nEnd).endOf('day').format();
        console.log("Start Of: ", startDate, "End of: ", endOf);
        Clase.find({
            fecha: {
                $gte: startOf,
                $lt: endOf
            }
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    },

    getMonth: (resolve, reject) => {
        let startOf = moment().startOf('month').format();
        let endOf = moment().endOf('month').format();

        Clase.find({
            fecha: {
                $gte: startOf,
                $lt: endOf
            }
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    }
}

module.exports = Clases