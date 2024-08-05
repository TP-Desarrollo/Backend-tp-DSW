import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { TipoVehiculo } from "./tipoVehiculo.entity.js"

const em = orm.em

function sanitizeTipoVehiculoInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizedInput = {
    id: req.body.id, 
    tipo: req.body.tipo, 
    descripcion: req.body.descripcion,
    vehiculos: req.body.vehiculos, 
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
    const tipoVehiculos = await em.find(TipoVehiculo, {}, {populate:['vehiculos']})
    res.status(200).json({message:"Tipo Vehiculos encontrados", data: tipoVehiculos})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id)
  try {
    const tipoVehiculo = await em.findOneOrFail(TipoVehiculo, { id }, {populate:['vehiculos']})
    res.status(200).json({message:"Tipo Vehiculo encontrado", data: tipoVehiculo})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function add(req: Request, res: Response){
  try {
    const tipoVehiculo = em.create(TipoVehiculo, req.body.sanitizedInput)
    await em.flush()
    res.status(201).send({message: 'Tipo Vehiculo creado', data: tipoVehiculo})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const tipoVehiculo =  em.getReference(TipoVehiculo, id )
    em.assign(tipoVehiculo, req.body.sanitizedInput)
    await em.flush()
    res.status(200).send({message: 'Tipo Vehiculo actualizado', data: tipoVehiculo})
  } catch (error:any) {
    res.status(500).json({error: error.message})
  }
}


async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const tipoVehiculo =  em.getReference(TipoVehiculo, id )
    await em.removeAndFlush(tipoVehiculo)
    res.status(200).send({message: 'Tipo Vehiculo eliminado', data: tipoVehiculo})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

export{
  sanitizeTipoVehiculoInput,
  findAll,
  findOne,
  add,
  update,
  remove
}