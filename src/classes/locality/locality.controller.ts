import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Locality } from "./locality.entity.js"

const em = orm.em

function sanitizeLocalityInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizedInput = {
    id: req.body.id, 
    name: req.body.name, 
    province: req.body.province,
    clients: req.body.clients,
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
    const localities = await em.find(Locality, {} ,{populate:['customers']})
    res.status(200).json({message:"Localitions found", data: localities})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id)
  try {
    const locality = await em.findOneOrFail(Locality, { id }, {populate:['customers']})
    res.status(200).json({message:"Localition found", data: locality})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function add(req: Request, res: Response){
  try {
    const locality = em.create(Locality, req.body.sanitizedInput)
    await em.flush()
    res.status(201).send({message: 'Location created', data: locality})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const locality =  em.getReference(Locality, id )
    em.assign(locality, req.body.sanitizedInput)
    await em.flush()
    res.status(200).send({message: 'Location updated', data: locality})
  } catch (error:any) {
    res.status(500).json({error: error.message})
  }
}


async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const locality =  em.getReference(Locality, id )
    await em.removeAndFlush(locality)
    res.status(200).send({message: 'Location deleted', data: locality})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

export{
  sanitizeLocalityInput,
  findAll,
  findOne,
  add,
  update,
  remove
}