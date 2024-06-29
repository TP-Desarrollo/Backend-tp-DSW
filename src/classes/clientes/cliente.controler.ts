import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Cliente } from "./cliente.entity.js"

const em = orm.em

function sanitizeClienteInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizedInput = {
    dni: req.body.dni, 
    nombre: req.body.nombre, 
    email: req.body.email,
    clave: req.body.clave, 
    apellido: req.body.apellido,
    localidad: req.body.localidad,
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
    const cliente = await em.find(Cliente, {}, { populate: ['localidad'] })
    res.status(200).json({message:"Clientes encontrados", data: cliente})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id)
  try {
    const cliente = await em.findOneOrFail(Cliente, { id })
    res.status(200).json({message:"Cliente encontrado", data: cliente})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function add(req: Request, res: Response){
  try {
    const cliente = em.create(Cliente, req.body.sanitizedInput)
    await em.flush()
    res.status(201).send({message: 'Cliente creado', data: cliente})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const cliente =  em.getReference(Cliente, id )
    em.assign(cliente, req.body.sanitizedInput)
    await em.flush()
    res.status(200).send({message: 'Cliente actualizado', data: cliente})
  } catch (error:any) {
    res.status(500).json({error: error.message})
  }
}


async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const cliente =  em.getReference(Cliente, id )
    await em.removeAndFlush(cliente)
    res.status(200).send({message: 'Cliente eliminado', data: cliente})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

export{
  sanitizeClienteInput,
  findAll,
  findOne,
  add,
  update,
  remove
}