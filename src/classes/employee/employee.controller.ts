import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Employee } from "./employee.entity.js"

const em = orm.em

function sanitizeEmployeeInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizedInput = {
    idNumber: req.body.idNumber, 
    firstName: req.body.firstName, 
    email: req.body.email,
    password: req.body.password, 
    lastName: req.body.lastName,
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
    const employee = await em.find(Employee, {}, { populate: ['rentals'] })
    res.status(200).json({message:"Employees found", data: employee})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id)
  try {
    const employee = await em.findOneOrFail(Employee, { id }, { populate: ['rentals'] })
    res.status(200).json({message:"Employee found", data: employee})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function add(req: Request, res: Response){
  try {
    const employee = em.create(Employee, req.body.sanitizedInput)
    await em.flush()
    res.status(201).send({message: 'Employee created', data: employee})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const employee =  em.getReference(Employee, id )
    em.assign(employee, req.body.sanitizedInput)
    await em.flush()
    res.status(200).send({message: 'Employee updated', data: employee})
  } catch (error:any) {
    res.status(500).json({error: error.message})
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const employee =  em.getReference(Employee, id )
    await em.removeAndFlush(employee)
    res.status(200).send({message: 'Employee deleted', data: employee})
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
}

export{
  sanitizeEmployeeInput,
  findAll,
  findOne,
  add,
  update,
  remove
}