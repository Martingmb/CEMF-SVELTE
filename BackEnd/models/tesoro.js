const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tesoro = new Schema({
    tesoro: { type: Schema.Types.Decimal128, required: true }
})

let model = mongoose.model('Tesoro', tesoro, 'Tesoro');

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