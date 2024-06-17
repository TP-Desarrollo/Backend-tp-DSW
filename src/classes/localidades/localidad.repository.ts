import { Repository } from "../../shared/repository.js";
import { Localidad } from "./localidad.entity.js";

const localidades = [
  new Localidad(
    1,
    'Arias',
    'Cordoba',
    [2624]
  ),

  new Localidad(
    2,
    'Rosario',
    'Santa Fe',
    [2000]
  ),
  new Localidad(
    3,
    'San Nicolas',
    'Buenos Aires',
    [2900]
  )
]

export class LocalidadRepository implements Repository<Localidad> { 

  public findAll(): Localidad[] | undefined {
    return localidades
  }
  public findOne(item: { id: number; }) {
    return localidades.find((localidad)=>localidad.id===item.id)
  }

  public add(item: Localidad): Localidad | undefined {
    localidades.push(item)
    return item
  }
  public update(item: Localidad): Localidad | undefined {
    const localidadIdx = localidades.findIndex((localidad) => localidad.id === item.id)
  
    if (localidadIdx !==-1) {
    localidades[localidadIdx] = {...localidades[localidadIdx], ...item}
    }
    return localidades[localidadIdx]
  }
  public delete(item: { id: number; }): Localidad | undefined {
    const localidadIdx = localidades.findIndex((localidad) => localidad.id === item.id)
    if (localidadIdx !== -1) {
      const deletedLocalidad = localidades[localidadIdx]
      localidades.splice(localidadIdx, 1)
      return deletedLocalidad
    }
  }
}