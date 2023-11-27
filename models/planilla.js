const mongoose = require('mongoose');
const planillaRouter = require('../controllers/planillas')

const planillaSchema = new mongoose.Schema({

    numeroPlanilla : String,
    fecha : String,
    departamento : String,
    nombreApellido : String,
    catedra : String,
    cedula : String,
    tipoDeMovimiento : String,
    dedicacionActual : String,
    dedicacionPropuesta : String,
    sueldo : String,
    unidadEjecutora : String,
    Categoria : String,
    Idac : String

});

// Registro nueva planilla

planillaSchema.set('toJSON', {
    transform:(document,returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
    } 
});

//Nombre para el modelo de datos
const Planilla = mongoose.model ('Planillas',planillaSchema);

module.exports = Planilla;