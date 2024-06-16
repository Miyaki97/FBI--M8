import 'dotenv/config'
import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'; 
import {verifyTokenJWT } from './middlewares/jwt.middleware.js'

import userRouter from './routes/user.routes.js'


export const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send("Funcionando")

})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/index.html'))
})

app.get('/autenticador', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'autenticador.html'))
})

app.get('/rutaProtegida',verifyTokenJWT,  (req, res) => {
    res.status(200).json({ message:'Acceso concedido', user: req.user})
});

app.get('/restringida',  (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/restringida.html'))
})

//ruta post
app.use('/users', userRouter)

const PORT = process.env.PORT || 3999
app.listen(PORT, () => {
    console.log(`puerto funciionando correctamente en http://localhost:${PORT} `)
})