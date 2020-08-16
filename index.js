const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3080
const conectarDB = require('./config/db')

//Conectando base de datos
conectarDB()

//Habilitar cors
app.use(cors())

app.use(express.json({extended: true}))
app.use('/api/registro',require('./routes/RegistroRoutes'))
app.use('/api/auth',require('./routes/AutenticadoRoutes'))
app.use('/api/proyectos',require('./routes/ProyectosRoutes'))
app.use('/api/tareas',require('./routes/TareasRoutes'))

app.listen(port,'0.0.0.0',()=>{
    console.log("servidor abierto en puerto 3080")
})