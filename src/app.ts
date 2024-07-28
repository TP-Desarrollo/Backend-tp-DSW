import "reflect-metadata"
import express from "express"
import { orm, syncSchema } from "./shared/db/orm.js"
import { RequestContext } from "@mikro-orm/core"
import { localidadRouter } from "./classes/localidad/localidad.routes.js"
import { vehiculoRouter } from "./classes/vehiculo/vehiculo.routes.js"
import { tipoVehiculoRouter } from "./classes/vehiculo/tipoVehiculo.routes.js"
import { clienteRouter } from "./classes/cliente/cliente.routes.js"
import { empleadoRouter } from "./classes/empleado/empleado.routes.js"
import { alquilerRouter } from "./classes/alquiler/alquiler.routes.js"


const app = express()
app.use(express.json()) // Middleware para el req.body

// Middleware del ORM
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

app.use('/api/localidades', localidadRouter)
app.use('/api/vehiculos', vehiculoRouter)
app.use('/api/vehiculos-tipos', tipoVehiculoRouter)
app.use('/api/clientes', clienteRouter)
app.use('/api/empleados', empleadoRouter)
app.use('/api/alquileres', alquilerRouter)

app.use((_, res) => {
  res.status(404).send({message:'Ruta no encontrada'})
})

await syncSchema()

app.listen(3000, () => {
  console.log('Server started on port 3000')
})