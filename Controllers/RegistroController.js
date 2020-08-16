const Usuario = require('../model/registroModel')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
exports.crearUsuario = async (req,res) => {

    //Validando si tenemos errores en los datos

    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //Extrayendo valores
    const { email,password} = req.body
    try {
        //Comprobando si ya existe el email suministrado
        let usuario = await Usuario.findOne({email}) 
        
        if(usuario) {
            return res.status(400).json({
               msg: "Email ya existe,Ingrese uno diferente"
            })
        }

        
       //creando usuario con los datos suministrados
         usuario  = new Usuario(req.body)

       //Encriptando password 
          const salt = await bcryptjs.genSalt(10)
          usuario.password = await bcryptjs.hash(password,salt)
            await usuario.save()

            //Creando JWT
         const payload= { 
             usuario: {id : usuario.id}
         }
        jwt.sign(payload,process.env.SECRETA,{expiresIn: 3600},(error,token)=>{
                if(error) throw error
                return res.json({token})
             
        })
        
 
           

       
      
    } catch (error) {
        console.log(error) 
        res.status(400).json({
            msg: "Tuvimos un error"
        })
    }
      




}