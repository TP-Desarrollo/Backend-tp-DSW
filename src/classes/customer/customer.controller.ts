import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Customer } from "./customer.entity.js"

const em = orm.em

function sanitizeCustomerInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizedInput = {
    idNumber: req.body.idNumber, 
    firstName: req.body.firstName, 
    email: req.body.email,
    password: req.body.password, 
    address: req.body.address,
    phone: req.body.phone,
    lastName: req.body.lastName,
    locality: req.body.locality,
    rentals: req.body.rentals,
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
    const customer = await em.find(Customer, {}, { populate: ['locality','rentals'] })
    res.status(200).json({message:"Customers found", data: customer})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id)
  try {
    const customer = await em.findOneOrFail(Customer, { id }, { populate: ['locality','rentals'] })
    res.status(200).json({message:"Customer found", data: customer})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function add(req: Request, res: Response){
  try {
    const customer = em.create(Customer, req.body.sanitizedInput)
    await em.flush()
    res.status(201).send({message: 'Customer created', data: customer})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const customer =  em.getReference(Customer, id )
    em.assign(customer, req.body.sanitizedInput)
    await em.flush()
    res.status(200).send({message: 'Customer updated', data: customer})
  } catch (error:any) {
    res.status(500).json({error: error.message})
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const customer =  em.getReference(Customer, id )
    await em.removeAndFlush(customer)
    res.status(200).send({message: 'Customer deleted', data: customer})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

export{
  sanitizeCustomerInput,
  findAll,
  findOne,
  add,
  update,
  remove
}