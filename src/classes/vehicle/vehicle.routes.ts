import { Router } from "express";
import { sanitizeVehicleInput, findAll, findOne, add, update, remove } from "./vehicle.controller.js";

export const vehicleRouter = Router()

vehicleRouter.get('/', findAll)
vehicleRouter.get('/:id', findOne)
vehicleRouter.post('/', sanitizeVehicleInput, add)
vehicleRouter.put('/:id', sanitizeVehicleInput, update)
vehicleRouter.delete('/:id', remove)