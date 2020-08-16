const express = require('express') 
const router = express.Router()
const RegistroController = require('../Controllers/RegistroController')
const {check} = require('express-validator')
router.post('/',

  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('email','El Email es obligatorio').isEmail(),
  check('password','Debe tener al menos 6 digitos').isLength({min: 6})

,RegistroController.crearUsuario)

 
module.exports = router