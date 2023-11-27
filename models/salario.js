const mongoose = require('mongoose');
const salariosRouter = require('../controllers/salarios');


//definir el schema
const salarioSchema = new mongoose.Schema({

    tipo:String,
    categoria:String,
    dedicacion:String,
    monto:String   

})

salarioSchema.set('toJSON',{
    //document es el Schema
    //returnObject es lo que estoy solicitando
    transform: (document,returnObject)=>{
        //se esta creando una nueva propiedad que se llame id
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.password;
    }
})

const Salario = mongoose.model('Salario', salarioSchema);
module.exports = Salario;
