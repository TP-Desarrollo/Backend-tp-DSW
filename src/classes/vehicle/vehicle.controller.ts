import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Vehicle } from "./vehicle.entity.js"
import fs from 'fs'

const em = orm.em

function sanitizeVehicleInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizedInput = {
    id: req.body.id, 
    licensePlate: req.body.licensePlate, 
    brand: req.body.brand,
    model: req.body.model,
    status: req.body.status,
    imageUrl: req.file ? req.file.filename : req.body.imageUrl,
    vehicleType: req.body.vehicleType,
    rentals: req.body.rentals
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
    const vehicles = await em.find(Vehicle, {}, {populate: ['vehicleType']}) // We could add the populate of rentals, for now it doesn't seem necessary
    res.status(200).json({message:"Vehicles found", data: vehicles})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id)
  try {
    const vehicle = await em.findOneOrFail(Vehicle, { id }, {populate: ['vehicleType']}) // We could add the populate of rentals, for now it doesn't seem necessary
    res.status(200).json({message:"Vehicle found", data: vehicle})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function add(req: Request, res: Response){
  try {
    const vehicle = em.create(Vehicle, req.body.sanitizedInput)
    await em.flush()
    res.status(201).send({message: 'Vehicle created', data: vehicle})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const vehicle =  em.getReference(Vehicle, id )
    em.assign(vehicle, req.body.sanitizedInput)
    await em.flush()
    res.status(200).send({message: 'Vehicle updated', data: vehicle})
  } catch (error:any) {
    res.status(500).json({error: error.message})
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const vehicle =  await em.findOneOrFail(Vehicle, { id })    // Chequear si esto esta bien, porque aca traigo si o si el vehiculo para borrar la imagen, no por reference como estaba antes
    fs.unlink(`./src/uploads/${vehicle.imageUrl}`, (err: any) => {
      if(err) {
        console.log("Error deleteing file: ", err)
      } else {
        console.log('File deleted')
      }
    })
    await em.removeAndFlush(vehicle)
    res.status(200).send({message: 'Vehicle deleted', data: vehicle})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

export{
  sanitizeVehicleInput,
  findAll,
  findOne,
  add,
  update,
  remove
}