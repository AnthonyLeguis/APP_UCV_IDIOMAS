const Personal = require ('../models/personal');
const personalRouter = require('express').Router();

personalRouter.post('/', async (request,response) => {
    const {nameFull,cedula,departamento,catedra,Idac} = request.body;

    //console.log(nameFull,cedula,departamento,catedra,Idac);

    if (!nameFull || !cedula || !departamento || !catedra || !Idac) {
        return response.status(400).json({ error: 'Campos vacíos' });
      }

    try {

        const newPersonal = new Personal ({ nameFull,cedula,departamento,catedra,Idac });
        await newPersonal.save();
        //console.log('Datos guardados en MongoDB:', newUser);
        response.status(201).json({ message: 'Datos guardados en MongoDB' });

    } catch (error) {
        console.error(error)
    }
})


personalRouter.get('/', async (request, response, next) => {
  const cedula = request.query.cedula;

  if (cedula) {
    // Si se proporciona la cedula, buscar un único documento
    try {
      const resultado = await Personal.findOne({ cedula: cedula });
      response.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Error al obtener el resultado' });
    }
  } else {
    // Si no se proporciona la cedula, buscar todos los documentos
    try {
      const personal = await Personal.find();
      const personalReducido = personal.map((p) => ({
        nameFull: p.nameFull,
        cedula: p.cedula,
        departamento: p.departamento,
        Idac: p.Idac,
      }));
      response.status(200).json(personalReducido);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Error al obtener los datos del personal' });
    }
  }
});

module.exports = personalRouter;