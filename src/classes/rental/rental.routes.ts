import { Router } from "express";
import { sanitizeRentalInput, findAll, findOne, add, update, remove } from "./rental.controller.js";

export const rentalRouter = Router()

rentalRouter.get('/', findAll)
rentalRouter.get('/:id', findOne)
rentalRouter.post('/', sanitizeRentalInput, add)
rentalRouter.put('/:id', sanitizeRentalInput, update)
rentalRouter.delete('/:id', remove)