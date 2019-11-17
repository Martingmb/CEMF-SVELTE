const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

let AseoSchema = new Schema({
    maestro: { type: Schema.Types.ObjectId, required: true, ref: 'Maestro' },
    nombre: String,
    monto: { type: Schema.Types.Decimal128, required: true },
    clase: { type: Schema.Types.String, required: true },
    fecha: { type: Date, required: true }
});

const Aseo = mongoose.model("Aseo", AseoSchema);

const Aseos = {
    get: function(resolve, reject) {
        Aseo.find()
            .then(aseos => {
                resolve(aseos);
            })
            .catch(err => {
                reject(err);
            });
    },

    getOne: function(resolve, reject, AseoId) {
        Aseo.findById(AseoId)
            .then(aseo => {
                resolve(aseo);
            })
            .catch(err => {
                reject(err);
            });
    },

    create: function(resolve, reject, newAseo) {
        Aseo.create(newAseo)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    },

    update: function(resolve, reject, AseoId, updatedAseo) {
        Aseo.findByIdAndUpdate(AseoId, { $set: updatedAseo }, { new: true })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    },

    delete: function(resolve, reject, AseoId) {
        Aseo.findByIdAndDelete(AseoId)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    },

    getWithDate: (resolve, reject, date) => {
        console.log("Model Date: ", date);
        let newDate = new Date(date);
        console.log('New Date: ', newDate);
        let startOf = moment(newDate).startOf('day').format();
        let endOf = moment(newDate).endOf('day').format();
        console.log("Start Date: ", startOf, " End Date: ", endOf);

        Aseo.find({
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

module.exports = Aseos