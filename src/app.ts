import express from "express"
import { Localidad } from "./classes/localidad/localidad.js"

const app = express()

const localidades = [
  new Localidad(
    1,
    'Arias',
    'Cordoba',
    2624
  ),

  new Localidad(
    2,
    'Rosario',
    'Santa Fe',
    2000
  ),
  new Localidad(
    3,
    'San Nicolas',
    'Buenos Aires',
    2900
  )
]


app.get('/api/localidades', (req, res) => {
  res.json(localidades)
})



app.listen(3000, () => {
  console.log('Server started on port 3000')
})