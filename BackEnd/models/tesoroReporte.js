const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tesoro = new Schema({
    aseo: Schema.Types.Decimal128,
    ofrenda: Schema.Types.Decimal128,
    tesoro: Schema.Types.Decimal128,
    tesoroCalculo: Schema.Types.Decimal128,
    fecha: Schema.Types.Date
})

let model = mongoose.model('TesoroReporte', tesoro, 'TesoroReporte');

const Tesoro = {
    get: function(resolve, reject) {
        model.find()
            .then(tesoreria => {
                resolve(tesoreria);
            })
            .catch(err => {
                reject(err);
            });
    },

    create: function(resolve, reject, newTesoreria) {
        model.create(newTesoreria)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    },

    update: function(resolve, reject, tesoreriaId, updatedTesoreria) {

        console.log("Updated tesoro: ", updatedTesoreria);

        model.findByIdAndUpdate(tesoreriaId, { $set: updatedTesoreria }, { new: true }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    },

    delete: function(resolve, reject, tesoreriaId) {
        model.findByIdAndDelete(tesoreriaId)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    }
}

module.exports = Tesoro;