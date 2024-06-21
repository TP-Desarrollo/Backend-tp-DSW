import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Localidad } from "./localidad.entity.js"

const em = orm.em

function sanitizeLocalidadInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizedInput = {
    id: req.body.id, 
    nombre: req.body.nombre, 
    provincia: req.body.provincia, 
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
    const localidades = await em.find(Localidad, {})
    res.status(200).json({message:"Localidades encontradas", data: localidades})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id)
  try {
    const localidad = await em.findOneOrFail(Localidad, { id })
    res.status(200).json({message:"Localidad encontrada", data: localidad})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function add(req: Request, res: Response){
  try {
    const localidad = em.create(Localidad, req.body.sanitizedInput)
    await em.flush()
    res.status(201).send({message: 'Localidad creada', data: localidad})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const localidad =  em.getReference(Localidad, id )
    em.assign(localidad, req.body.sanitizedInput)
    await em.flush()
    res.status(200).send({message: 'Localidad actualizada', data: localidad})
  } catch (error:any) {
    res.status(500).json({error: error.message})
  }
}


async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const localidad =  em.getReference(Localidad, id )
    await em.removeAndFlush(localidad)
    res.status(200).send({message: 'Localidad eliminada', data: localidad})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

export{
  sanitizeLocalidadInput,
  findAll,
  findOne,
  add,
  update,
  remove
}