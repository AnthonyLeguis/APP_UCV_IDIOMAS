//1 Hacer el router
//router: registrar POST, GET, DELETE
const User = require('../models/user');
const userRouter = require('express').Router();
const bcrypt = require('bcrypt');

//registrar la informacion que el usuario envia a traves del formulario
userRouter.post('/', async (request,response)=>{
    const {name,email,password} = request.body;
    //console.log(name,email,password);

    if (!name || !email || !password) {
      return response.status(400).json({ error: 'Campos vacíos' });
    }

    try {

        // Generar un hash de la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
      
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        //console.log('Datos guardados en MongoDB:', newUser);
        response.status(201).json({ message: 'Datos guardados en MongoDB' });
    } catch (error) {
        console.error('Error al guardar los datos en MongoDB:', error);
        response.status(500).json({ error: 'Error al guardar los datos en MongoDB' });
    }

});

// Controlador para el inicio de sesión
userRouter.post('/login', async (request, response) => {
    const { email, password } = request.body;
  
    try {
      // Busca el usuario en la base de datos utilizando el correo electrónico
      const user = await User.findOne({ email });
  
      // Verifica si el usuario existe y si la contraseña es correcta
      if (user) {
        const passwordMatch = bcrypt.compare(password, user.password);
        if (passwordMatch) {
          // Si las credenciales son válidas, redirige al usuario a la página de administrador
          response.redirect('/planillas');
        } else {
          // Si las credenciales no son válidas, muestra un mensaje de error
          response.render('login', { error: 'Credenciales inválidas' });
        }
      } else {
        // Si el usuario no existe, muestra un mensaje de error
        response.render('login', { error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al realizar la consulta en la base de datos:', error);
      response.render('login', { error: 'Error al iniciar sesión' });
    }
});



module.exports = userRouter;