import express from "express"
import { localidadRouter } from "./classes/localidades/localidad.routes.js"

const app = express()
app.use(express.json()) // Middleware para el req.body

app.use('/api/localidades', localidadRouter)

app.use((_, res) => {
  res.status(404).send({message:'Ruta no encontrada'})
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})