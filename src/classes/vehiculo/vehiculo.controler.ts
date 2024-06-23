import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Vehiculo } from "./vehiculo.entity.js"

const em = orm.em

function sanitizeVehiculoInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizedInput = {
    id: req.body.id, 
    patente: req.body.patente, 
    marca: req.body.marca,
    modelo: req.body.modelo, 
    tipoVehiculo: req.body.tipoVehiculo
  }
  // Faltan validaciones aca de otras cosas

  Object.keys(req.body.sanitizedInput).forEach(key => {
    if(req.body.sanitizedInput[key] === undefined){
      delete req.body.sanitizedInput[key]
      }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const vehiculos = await em.find(Vehiculo, {}, {populate: ['tipoVehiculo']})
    res.status(200).json({message:"Vehiculos encontrados", data: vehiculos})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id)
  try {
    const vehiculo = await em.findOneOrFail(Vehiculo, { id })
    res.status(200).json({message:"Vehiculo encontrado", data: vehiculo})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function add(req: Request, res: Response){
  try {
    const vehiculo = em.create(Vehiculo, req.body.sanitizedInput)
    await em.flush()
    res.status(201).send({message: 'Vehiculo creado', data: vehiculo})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const vehiculo =  em.getReference(Vehiculo, id )
    em.assign(vehiculo, req.body.sanitizedInput)
    await em.flush()
    res.status(200).send({message: 'Vehiculo actualizado', data: vehiculo})
  } catch (error:any) {
    res.status(500).json({error: error.message})
  }
}


async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const vehiculo =  em.getReference(Vehiculo, id )
    await em.removeAndFlush(vehiculo)
    res.status(200).send({message: 'Vehiculo eliminada', data: vehiculo})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

export{
  sanitizeVehiculoInput,
  findAll,
  findOne,
  add,
  update,
  remove
}