import { Router } from "express";
import { sanitizeVehicleTypeInput, findAll, findOne, add, update, remove } from "./vehicleType.controller.js";

export const vehicleTypeRouter = Router()

vehicleTypeRouter.get('/', findAll)
vehicleTypeRouter.get('/:id', findOne)
vehicleTypeRouter.post('/', sanitizeVehicleTypeInput, add)
vehicleTypeRouter.put('/:id', sanitizeVehicleTypeInput, update)
vehicleTypeRouter.delete('/:id', remove)