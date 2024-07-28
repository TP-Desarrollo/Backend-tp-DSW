import { Entity, ManyToOne, OneToMany, Property, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";
import { TipoVehiculo } from "./tipoVehiculo.entity.js";
import { Alquiler } from "../alquiler/alquiler.entity.js";

@Entity()
export class Vehiculo extends BaseEntity {

  @Property({nullable: false})
  patente!: string

  @Property({nullable: false})
  marca!: string

  @Property({nullable: false})
  modelo!: string

  @ManyToOne(() => TipoVehiculo, {nullable: false})
  tipoVehiculo!: TipoVehiculo

  @OneToMany(() => Alquiler, alquiler => alquiler.vehiculo, {cascade: [Cascade.ALL]})
  alquileres = new Collection<Alquiler>(this)

}