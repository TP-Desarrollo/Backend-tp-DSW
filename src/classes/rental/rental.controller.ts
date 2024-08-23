import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Rental } from "./rental.entity.js"

const em = orm.em

function sanitizeRentalInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizedInput = {
    id: req.body.id, 
    customer: req.body.customer, 
    employee: req.body.employee,
    vehicle: req.body.vehicle, 
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    status: req.body.status,
    price: req.body.price,
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
    const rental = await em.find(Rental, {}, { populate: ['customer','employee','vehicle'] })
    res.status(200).json({message:"Rentals found", data: rental})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id)
  try {
    const rental = await em.findOneOrFail(Rental, { id })
    res.status(200).json({message:"Rental found", data: rental})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function add(req: Request, res: Response){
  try {
    const rental = em.create(Rental, req.body.sanitizedInput)
    await em.flush()
    res.status(201).send({message: 'Rental created', data: rental})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const rental =  em.getReference(Rental, id )
    em.assign(rental, req.body.sanitizedInput)
    await em.flush()
    res.status(200).send({message: 'Rental updated', data: rental})
  } catch (error:any) {
    res.status(500).json({error: error.message})
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const rental =  em.getReference(Rental, id )
    await em.removeAndFlush(rental)
    res.status(200).send({message: 'Rental deleted', data: rental})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

export{
  sanitizeRentalInput,
  findAll,
  findOne,
  add,
  update,
  remove
}