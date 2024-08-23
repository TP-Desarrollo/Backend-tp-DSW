import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { VehicleType } from "./vehicleType.entity.js"

const em = orm.em

function sanitizeVehicleTypeInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizedInput = {
    id: req.body.id, 
    type: req.body.type, 
    description: req.body.description,
    vehicles: req.body.vehicles, 
  }
  // Missing validations here for other things

  Object.keys(req.body.sanitizedInput).forEach(key => {
    if(req.body.sanitizedInput[key] === undefined){
      delete req.body.sanitizedInput[key]
      }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const vehicleTypes = await em.find(VehicleType, {}, {populate:['vehicles']})
    res.status(200).json({message:"Vehicle Types found", data: vehicleTypes})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id)
  try {
    const vehicleType = await em.findOneOrFail(VehicleType, { id }, {populate:['vehicles']})
    res.status(200).json({message:"Vehicle Type found", data: vehicleType})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function add(req: Request, res: Response){
  try {
    const vehicleType = em.create(VehicleType, req.body.sanitizedInput)
    await em.flush()
    res.status(201).send({message: 'Vehicle Type created', data: vehicleType})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const vehicleType =  em.getReference(VehicleType, id )
    em.assign(vehicleType, req.body.sanitizedInput)
    await em.flush()
    res.status(200).send({message: 'Vehicle Type updated', data: vehicleType})
  } catch (error:any) {
    res.status(500).json({error: error.message})
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const vehicleType =  em.getReference(VehicleType, id )
    await em.removeAndFlush(vehicleType)
    res.status(200).send({message: 'Vehicle Type deleted', data: vehicleType})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

export{
  sanitizeVehicleTypeInput,
  findAll,
  findOne,
  add,
  update,
  remove
}