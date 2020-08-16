const express = require('express') 
const router = express.Router()
const {check} = require('express-validator')
const auth = require('../config/auth')
const TareasController = require('../Controllers/TareasController')
router.post('/',auth,
check('nombre','El nombre del proeycto es obligatorio').not().isEmpty(),
check('proyecto','El proyecto es obligatorio').not().isEmpty(),
TareasController.crearTarea)

 router.get('/',auth,TareasController.obtenerTarea)

 router.put('/:id',auth,
 TareasController.actualizarTarea)


 router.delete('/:id',auth,TareasController.eliminarTarea)

module.exports = router