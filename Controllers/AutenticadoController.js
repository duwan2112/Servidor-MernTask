const Usuarios = require("../model/registroModel")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
exports.usuarioAutenticado = async (req,res)=>{


    try {
        const usuario = await Usuarios.findById(req.usuario.id).select('-password')
        res.json({
           usuario
        })
       
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hubo un error'
        })
    }
}


exports.crearUsuario = async (req,res ) => {
  
    const errores = validationResult(req)
    if(!errores.isEmpty()){res.status(400).json({errores: errores.array()})}

       const {email,password } = req.body
    try {
        let usuario = await Usuarios.findOne({email})
        if(!usuario){
            res.status(401).json({
                msg: 'Usuario no valido'
            })
        }

        const passwordCorrecta = await bcryptjs.compare(password,usuario.password) 
        if(!passwordCorrecta){
            res.status(401).json({
                msg: 'Password no valida'
            })
        }

        
        const payload = {
            usuario: {id: usuario.id}
        }
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 3600
        }, (error,token)=> {
           
            if(error) throw error
    
            return res.json({token})

        })


    } catch (error) {
        console.log(error)
        res.status(401).json({msg: "hubo un error"})
    }
       
}