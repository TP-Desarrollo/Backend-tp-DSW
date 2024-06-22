import { Entity, ManyToOne, Property, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";
import { TipoVehiculo } from "./tipoVehiculo.entity.js";

@Entity()
export class Vehiculo extends BaseEntity {

  @Property({nullable: false})
  patente!: string

  @Property({nullable: false})
  marca!: string

  @Property({nullable: false})
  modelo!: string

  @ManyToOne(() => TipoVehiculo, {nullable: false})
  tipoVehiculo!: Rel<TipoVehiculo>
}