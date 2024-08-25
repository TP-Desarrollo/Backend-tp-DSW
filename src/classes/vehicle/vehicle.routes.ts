import { Router } from "express";
import { sanitizeVehicleInput, findAll, findOne, add, update, remove } from "./vehicle.controller.js";
import { upload } from "../../middlewares/multer.config.js";

export const vehicleRouter = Router()

vehicleRouter.get('/', findAll)
vehicleRouter.get('/:id', findOne)
vehicleRouter.post('/', upload.single('imageUrl'),sanitizeVehicleInput, add)
vehicleRouter.put('/:id', upload.single('imageUrl'),sanitizeVehicleInput, update)
vehicleRouter.delete('/:id', remove)