import "reflect-metadata"
import express from "express"
import cors from "cors"
import { orm, syncSchema } from "./shared/db/orm.js"
import { RequestContext } from "@mikro-orm/core"
import { localityRouter } from "./classes/locality/locality.routes.js"
import { vehicleRouter } from "./classes/vehicle/vehicle.routes.js"
import { vehicleTypeRouter } from "./classes/vehicle/vehicleType.routes.js"
import { customerRouter } from "./classes/customer/customer.routes.js"
import { employeeRouter } from "./classes/employee/employee.routes.js"
import { rentalRouter } from "./classes/rental/rental.routes.js"

const app = express()

app.use(express.json()) // Middleware for req.body
app.use(cors({
  origin: '*',
  credentials: true,
}))

// ORM Middleware
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

app.use('/localities', localityRouter)
app.use('/vehicles', vehicleRouter)
app.use('/vehicle-types', vehicleTypeRouter)
app.use('/customers', customerRouter)
app.use('/employees', employeeRouter)
app.use('/rentals', rentalRouter)

app.use((_, res) => {
  res.status(404).send({message:'Route not found'})
})

await syncSchema()

app.listen(3000, () => {
  console.log('Server started on port 3000')
})