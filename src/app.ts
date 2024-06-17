import express from "express"
import { Localidad } from "./classes/localidades/localidad.js"

const app = express()
app.use(express.json()) // Middleware para el req.body


const localidades = [
  new Localidad(
    1,
    'Arias',
    'Cordoba',
    [2624]
  ),

  new Localidad(
    2,
    'Rosario',
    'Santa Fe',
    [2000]
  ),
  new Localidad(
    3,
    'San Nicolas',
    'Buenos Aires',
    [2900]
  )
]


app.get('/api/localidades', (req, res) => {
  res.json(localidades)
})

app.get('/api/localidades/:id', (req, res) => {
  const localidad = localidades.find(localidad => localidad.id === parseInt(req.params.id))
  if (!localidad) {
    res.status(404).send('Localidad no encontrada')
  }
  res.json(localidad)
})

app.post('/api/localidades', (req, res) => {
  const {id, nombre, provincia, codpostal} = req.body
  const localidad = new Localidad(id, nombre, provincia, codpostal)
  localidades.push(localidad)
  res.status(201).send({
    message: 'Localidad creada',})
})

app.put('/api/localidades/:id', (req, res) => {
  const localidadIdx = localidades.findIndex((localidad) => localidad.id === parseInt(req.params.id))
  
  if (!localidadIdx) {
    res.status(404).send('Localidad no encontrada')
  }
  const input = {
    id: req.body.id, 
    nombre: req.body.nombre, 
    provincia: req.body.provincia, 
    codpostal: req.body.codpostal
  }
  localidades[localidadIdx] = {...localidades[localidadIdx], ...input}
  res.status(200).send({message: 'Localidad actualizada', data: localidades[localidadIdx]})
})


app.listen(3000, () => {
  console.log('Server started on port 3000')
})