import "reflect-metadata"
import express from "express"
import { localidadRouter } from "./classes/localidades/localidad.routes.js"
import { orm, syncSchema } from "./shared/db/orm.js"
import { RequestContext } from "@mikro-orm/core"

const app = express()
app.use(express.json()) // Middleware para el req.body

// Middleware del ORM
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})


app.use('/api/localidades', localidadRouter)

app.use((_, res) => {
  res.status(404).send({message:'Ruta no encontrada'})
})

await syncSchema()

app.listen(3000, () => {
  console.log('Server started on port 3000')
})