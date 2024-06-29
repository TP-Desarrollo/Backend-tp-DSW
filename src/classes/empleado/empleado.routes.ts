import { Router } from "express";
import { sanitizeEmpleadoInput, findAll, findOne, add, update, remove } from "./empleado.controler.js";

export const empleadoRouter = Router()

empleadoRouter.get('/', findAll)
empleadoRouter.get('/:id', findOne)
empleadoRouter.post('/', sanitizeEmpleadoInput, add)
empleadoRouter.put('/:id', sanitizeEmpleadoInput, update)
empleadoRouter.delete('/:id', remove)