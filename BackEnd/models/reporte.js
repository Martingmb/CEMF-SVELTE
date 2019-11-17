const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const moment = require('moment');

let ReporteSchema = new Schema({
    clase: { type: Schema.Types.String, required: true },
    capitulosLeidos: { type: Number, required: true },
    visita: { type: Boolean, required: false },
    asistencia: { type: [Schema.Types.String], required: false },
    maestro: { type: Schema.Types.ObjectId, ref: 'users' },
    nombre: String,
    fecha: { type: Date, unique: true, required: true }
});

const Reporte = mongoose.model("Reporte", ReporteSchema, "reporteMaestro");

const Reportes = {
    get: function(resolve, reject) {
        Reporte.find()
            .then(reportes => {
                resolve(reportes);
            })
            .catch(err => {
                reject(err);
            });
    },

    getOne: function(resolve, reject, ReporteId) {
        Reporte.findById(ReporteId)
            .then(reporte => {
                resolve(reporte);
            })
            .catch(err => {
                reject(err);
            });
    },

    getWithinRange: (resolve, reject, startDate, endDate) => {
        let nStart = new Date(startDate);
        let nEnd = new Date(endDate);
        let startOf = moment(nStart).startOf('day');
        let endOf = moment(nEnd).endOf('day');
        let diff = endOf.diff(startOf, 'weeks');
        console.log("Start Of: ", startDate, "End of: ", endOf);
        Reporte.find({
            fecha: {
                $gte: startOf,
                $lt: endOf
            }
        }).then(result => {
            let objRes = {
                result: result,
                weeks: diff
            }
            resolve(objRes);
        }).catch(err => {
            reject(err);
        })
    },

    getUntilNow: (resolve, reject) => {
        let newDate = new Date('06-15-19');
        let startOf = moment(newDate).startOf('day');
        let diff = moment().diff(startOf, 'weeks');
        Reporte.find({
            fecha: {
                $gte: startOf
            }
        }).then(result => {
            let objRes = {
                result: result,
                weeks: diff
            }
            resolve(objRes);
        }).catch(err => {
            reject(err);
        })
    },

    create: function(resolve, reject, newReporte) {
        Reporte.create(newReporte)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    },

    update: function(resolve, reject, ReporteId, updatedReporte) {
        Reporte.findByIdAndUpdate(ReporteId, { $set: updatedReporte }, { new: true })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    },

    delete: function(resolve, reject, ReporteId) {
        Reporte.findByIdAndDelete(ReporteId)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    }
}

module.exports = Reportes;