import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Empleado } from "./empleado.entity.js"


const em = orm.em

function sanitizeEmpleadoInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizedInput = {
    dni: req.body.dni, 
    nombre: req.body.nombre, 
    email: req.body.email,
    clave: req.body.clave, 
    apellido: req.body.apellido,
    alquileres: req.body.alquileres,
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
    const empleado = await em.find(Empleado, {})
    res.status(200).json({message:"Empleados encontrados", data: empleado})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id)
  try {
    const empleado = await em.findOneOrFail(Empleado, { id })
    res.status(200).json({message:"Empleado encontrado", data: empleado})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function add(req: Request, res: Response){
  try {
    const empleado = em.create(Empleado, req.body.sanitizedInput)
    await em.flush()
    res.status(201).send({message: 'Empleado creado', data: empleado})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const empleado =  em.getReference(Empleado, id )
    em.assign(empleado, req.body.sanitizedInput)
    await em.flush()
    res.status(200).send({message: 'Empleado actualizado', data: empleado})
  } catch (error:any) {
    res.status(500).json({error: error.message})
  }
}


async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const empleado =  em.getReference(Empleado, id )
    await em.removeAndFlush(empleado)
    res.status(200).send({message: 'Empleado eliminado', data: empleado})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

export{
  sanitizeEmpleadoInput,
  findAll,
  findOne,
  add,
  update,
  remove
}