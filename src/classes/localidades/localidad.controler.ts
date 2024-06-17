import { Request, Response, NextFunction } from "express"
import { LocalidadRepository } from "./localidad.repository.js"
import { Localidad } from "./localidad.entity.js"

const repository = new LocalidadRepository()
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

function findAll(req: Request, res: Response) {
  res.json({data:repository.findAll()})
}

function findOne(req: Request, res: Response) {
  const localidad = repository.findOne({id: parseInt(req.params.id)})
  if (!localidad) {
    return res.status(404).send({message: 'Localidad no encontrada'})
  }
  res.json(localidad)
}

function add(req: Request, res: Response){
  const input = req.body.sanitizedInput
  const localidadInput = new Localidad(input.id, input.nombre, input.provincia, input.codpostal)

  const localidad = repository.add(localidadInput)
  return res.status(201).send({message: 'Localidad creada', data: localidad})
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = parseInt(req.params.id)
  const localidad = repository.update(req.body.sanitizedInput)
  if (!localidad) {
    return res.status(404).send('Localidad no encontrada')
  }
  res.status(200).send({message: 'Localidad actualizada', data: localidad})
}


function remove(req: Request, res: Response) {
  const localidad = repository.delete({id: parseInt(req.params.id)})
  if (!localidad) {
    res.status(404).send({message: 'Localidad no encontrada'})
  }
  else{
  res.status(200).send({message: 'Localidad eliminada'})
  }
}

export{
  sanitizeLocalidadInput,
  findAll,
  findOne,
  add,
  update,
  remove}