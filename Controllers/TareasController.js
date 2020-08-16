
const {validationResult} = require('express-validator')
const Tarea = require('../model/TareaModel')
const Proyecto = require('../model/ProyectoModel')
exports.crearTarea = async (req,res) => {


        //Validando si tenemos errores en los datos
   
        const errores = validationResult(req)
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()})
        }
  
     
   try {
       const {proyecto} = req.body
       const proyectoexiste = await Proyecto.findById(proyecto)
       if(!proyectoexiste){
           return res.status(404).json({msg: 'Proyecto no encontrado'})
       }
       //Revisar qeu el proyecto sea de uno mismo
       if(proyectoexiste.creador.toString() !== req.usuario.id) {
        return res.status(401).json({msg: 'No autorizado'})
     }
     //Crear tarea 
     const tarea = new Tarea(req.body)
     await tarea.save()
     res.json({tarea})
   } catch (error) {
       console.log(error)
       res.status(500).json({msg: "Hubo un Error"})
   }
}


exports.obtenerTarea = async (req,res) => {
     
    try {
        const {proyecto} = req.query
        const proyectoexiste = await Proyecto.findById(proyecto)
        if(!proyectoexiste){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        //Revisar qeu el proyecto sea de uno mismo
        if(proyectoexiste.creador.toString() !== req.usuario.id) {
         return res.status(401).json({msg: 'No autorizado'})
      }
      //Obtener las tareas 
      const tareas = await Tarea.find({proyecto})

      res.json({tareas})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Hubo un Error"})
    }
 }
 
exports.actualizarTarea = async (req,res) => {
    try {
        const {proyecto,nombre,estado} = req.body
        let tareaExiste = await Tarea.findById(req.params.id) 
        if(!tareaExiste){
            return res.status(404).json({msg: 'No Existe esa tarea'})
        }
       
        //Revisar qeu el proyecto sea de uno mismo
        const proyectoexiste = await Proyecto.findById(proyecto)
        if(proyectoexiste.creador.toString() !== req.usuario.id) {
         return res.status(401).json({msg: 'No autorizado'})
      }

 //Crear un objeto con la nueva informacion 
 const nuevaTarea={}

          nuevaTarea.nombre = nombre
      

          nuevaTarea.estado = estado
      
      //Guardar la tarea
      tareaExiste = await Tarea.findOneAndUpdate({_id: req.params.id},nuevaTarea,{new: true})
     
      res.json({tareaExiste})
     

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Hubo un Error"})
    }
 }
 
exports.eliminarTarea = async (req,res) => {
    try {
        const {proyecto} = req.query
        
        let tareaExiste = await Tarea.findById(req.params.id) 
        if(!tareaExiste){
            return res.status(404).json({msg: 'No Existe esa tarea'})
        }
       
        //Revisar qeu el proyecto sea de uno mismo
        const proyectoexiste = await Proyecto.findById(proyecto)
        if(proyectoexiste.creador.toString() !== req.usuario.id) {
         return res.status(401).json({msg: 'No autorizado'})
      }
      //Eliminar tarea 
      await Tarea.findOneAndRemove({_id: req.params.id})
      res.json({msg: 'Tarea Eliminada'})
     
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Hubo un Error"})
    }
 }