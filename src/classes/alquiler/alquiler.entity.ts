import { Entity,ManyToOne,Property, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";
import { Empleado } from "../empleado/empleado.entity.js";
import { Cliente } from "../cliente/cliente.entity.js";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";

@Entity()
export class Alquiler extends BaseEntity {

  @ManyToOne(() => Cliente, {nullable: false})
  cliente!: Rel<Cliente>

  @ManyToOne(() => Empleado, {nullable: true}) // Puede que el alquiler lo realice un cliente desde su cuenta
  empleado?: Rel<Empleado>

  @ManyToOne(() => Vehiculo,{nullable: false})
  vehiculo!: Rel<Vehiculo>

  @Property({nullable: false})
  fechaInicio!: Date

  @Property({nullable: false})
  fechaFin!: Date

  @Property({nullable: false})
  estado!: string

  @Property({nullable: false})
  precio!: number

}