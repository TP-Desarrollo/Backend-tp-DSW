import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Alquiler } from "./alquiler.entity.js"

const em = orm.em

function sanitizeAlquilerInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizedInput = {
    id: req.body.id, 
    cliente: req.body.cliente, 
    empleado: req.body.empleado,
    vehiculo: req.body.vehiculo, 
    fechaInicio: req.body.fechaInicio,
    fechaFin: req.body.fechaFin,
    estado: req.body.estado,
    precio: req.body.precio,
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
    const alquiler = await em.find(Alquiler, {}, { populate: ['cliente','empleado','vehiculo'] })
    res.status(200).json({message:"Alquileres encontrados", data: alquiler})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id)
  try {
    const alquiler = await em.findOneOrFail(Alquiler, { id })
    res.status(200).json({message:"Alquiler encontrado", data: alquiler})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function add(req: Request, res: Response){
  try {
    const alquiler = em.create(Alquiler, req.body.sanitizedInput)
    await em.flush()
    res.status(201).send({message: 'Alquiler creado', data: alquiler})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const alquiler =  em.getReference(Alquiler, id )
    em.assign(alquiler, req.body.sanitizedInput)
    await em.flush()
    res.status(200).send({message: 'Alquiler actualizado', data: alquiler})
  } catch (error:any) {
    res.status(500).json({error: error.message})
  }
}


async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const alquiler =  em.getReference(Alquiler, id )
    await em.removeAndFlush(alquiler)
    res.status(200).send({message: 'Alquiler eliminado', data: alquiler})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

export{
  sanitizeAlquilerInput,
  findAll,
  findOne,
  add,
  update,
  remove
}