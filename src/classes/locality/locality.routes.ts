import { Router } from "express";
import { sanitizeLocalityInput, findAll, findOne, add, update, remove } from "./locality.controller.js";

export const localityRouter = Router()

localityRouter.get('/', findAll)
localityRouter.get('/:id', findOne)
localityRouter.post('/', sanitizeLocalityInput, add)
localityRouter.put('/:id', sanitizeLocalityInput, update)
localityRouter.delete('/:id', remove)