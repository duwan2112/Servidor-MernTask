const express = require('express') 
const router = express.Router()
const AutenticadoController = require('../Controllers/AutenticadoController')
const auth = require('../config/auth')
const {check} = require('express-validator')
router.get('/',auth,AutenticadoController.usuarioAutenticado)


router.post('/',
check('email','El email es obligatorio').isEmail(),
check('password','Password debe tener 6 digitos').isLength({min: 6}),
AutenticadoController.crearUsuario)


module.exports = router