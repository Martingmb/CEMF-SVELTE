const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let estudianteSchema = new Schema({
    clase: String,
    alumnos: [{
        type: String
    }]
});

const estudiante = mongoose.model("Estudiantes", estudianteSchema);

const estudiantes = {
    post: function(resolve, reject, newPlantilla) {
        estudiante.create(newPlantilla).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    }
};


module.exports = estudiantes;