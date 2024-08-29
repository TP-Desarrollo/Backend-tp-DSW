import { Router } from "express";
import { sanitizeVehicleInput, findAll, findOne, add, update, remove } from "./vehicle.controller.js";
import { handleUpload } from "../../middlewares/multer.config.js";

export const vehicleRouter = Router()

vehicleRouter.get('/', findAll)
vehicleRouter.get('/:id', findOne)
vehicleRouter.post('/', handleUpload,sanitizeVehicleInput, add)
vehicleRouter.put('/:id', handleUpload,sanitizeVehicleInput, update)
vehicleRouter.delete('/:id', remove)