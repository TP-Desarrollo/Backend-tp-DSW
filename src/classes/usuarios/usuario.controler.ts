import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Usuario } from "./usuario.entity.js"

const em = orm.em

function sanitizeUsuarioInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizedInput = {
    dni: req.body.dni, 
    nombre: req.body.nombre, 
    email: req.body.email,
    contra: req.body.contra, 
    apellido: req.body.apellido,
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
    const usuario = await em.find(Usuario, {})
    res.status(200).json({message:"Usuarios encontrados", data: usuario})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id)
  try {
    const usuario = await em.findOneOrFail(Usuario, { id })
    res.status(200).json({message:"Localidad encontrada", data: usuario})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function add(req: Request, res: Response){
  try {
    const usuario = em.create(Usuario, req.body.sanitizedInput)
    await em.flush()
    res.status(201).send({message: 'Usuario creado', data: usuario})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const usuario =  em.getReference(Usuario, id )
    em.assign(usuario, req.body.sanitizedInput)
    await em.flush()
    res.status(200).send({message: 'Usuario actualizado', data: usuario})
  } catch (error:any) {
    res.status(500).json({error: error.message})
  }
}


async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const usuario =  em.getReference(Usuario, id )
    await em.removeAndFlush(usuario)
    res.status(200).send({message: 'Usuario eliminado', data: usuario})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

export{
  sanitizeUsuarioInput,
  findAll,
  findOne,
  add,
  update,
  remove
}