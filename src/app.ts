import express, { Request, Response, NextFunction } from "express"
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

function sanitizeLocalidadInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizedInput = {
    id: req.body.id, 
    nombre: req.body.nombre, 
    provincia: req.body.provincia, 
    codpostal: req.body.codpostal
  }
  // Faltan validaciones aca de otras cosas

  Object.keys(req.body.sanitizedInput).forEach(key => {
    if(req.body.sanitizedInput[key] === undefined){
      delete req.body.sanitizedInput[key]
      }
  })
  next()
}

app.get('/api/localidades', (req, res) => {
  res.json(localidades)
})

app.get('/api/localidades/:id', (req, res) => {
  const localidad = localidades.find((localidad) => localidad.id === parseInt(req.params.id))
  if (!localidad) {
    return res.status(404).send({message: 'Localidad no encontrada'})
  }
  res.json(localidad)
})

app.post('/api/localidades', sanitizeLocalidadInput, (req, res) => {
  const input = req.body.sanitizedInput
  const localidad = new Localidad(input.id, input.nombre, input.provincia, input.codpostal)

  localidades.push(localidad)
  return res.status(201).send({message: 'Localidad creada', data: localidad})
})

app.put('/api/localidades/:id', sanitizeLocalidadInput, (req, res) => {
  const localidadIdx = localidades.findIndex((localidad) => localidad.id === parseInt(req.params.id))
  
  if (localidadIdx===-1) {
    return res.status(404).send('Localidad no encontrada')
  }

  localidades[localidadIdx] = {...localidades[localidadIdx], ...req.body.sanitizedInput}
  res.status(200).send({message: 'Localidad actualizada', data: localidades[localidadIdx]})
})

app.patch('/api/localidades/:id', sanitizeLocalidadInput, (req, res) => {
  const localidadIdx = localidades.findIndex((localidad) => localidad.id === parseInt(req.params.id))
  
  if (localidadIdx===-1) {
    return res.status(404).send('Localidad no encontrada')
  }

  localidades[localidadIdx] = {...localidades[localidadIdx], ...req.body.sanitizedInput}
  res.status(200).send({message: 'Localidad actualizada', data: localidades[localidadIdx]})
})

app.delete('/api/localidades/:id', (req, res) => {
  const localidadIdx = localidades.findIndex((localidad) => localidad.id === parseInt(req.params.id))
  if (localidadIdx === -1) {
    res.status(404).send({message: 'Localidad no encontrada'})
  }
  else{
  localidades.splice(localidadIdx, 1)
  res.status(200).send({message: 'Localidad eliminada'})
  }
})

app.use((req, res) => {
  res.status(404).send({message:'Ruta no encontrada'})
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})