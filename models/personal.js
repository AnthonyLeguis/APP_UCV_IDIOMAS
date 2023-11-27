const mongoose = require('mongoose');
const personalRouter = require('../controllers/personals');

const personalSchema = new mongoose.Schema({
    nameFull: String,
    cedula: String,
    departamento: String,
    catedra: String,
    Idac: String,  
});

//Consiguracion de registro de nuevo personal en Schame

personalSchema.set('toJSON', {
    transform:(document,returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
    }
});

// Asignacion de nombre, registrar el modelo, datos que posee el modelo
const Personal = mongoose.model ('Personal',personalSchema);

module.exports = Personal;