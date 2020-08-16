const express = require('express') 
const router = express.Router()
const {check} = require('express-validator')
const auth = require('../config/auth')
const ProyectosController = require('../Controllers/ProyectosController')
router.post('/',auth,check('nombre','El nombre del proeycto es obligatorio').not().isEmpty(),
ProyectosController.crearProyectos)

 router.get('/',auth,ProyectosController.obtenerProyectos)
 router.put('/:id',auth,check('nombre','El nombre del proyecto es obligatorio').not().isEmpty(),ProyectosController.actualizarProyecto)
 router.delete('/:id',auth,ProyectosController.eliminarProyecto)

module.exports = router