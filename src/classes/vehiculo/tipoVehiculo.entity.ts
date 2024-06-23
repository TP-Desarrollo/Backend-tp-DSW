import { Cascade, Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";
import { Vehiculo } from "./vehiculo.entity.js";

@Entity()
export class TipoVehiculo extends BaseEntity {

  @Property({nullable: false})
  tipo!: string

  @Property({nullable: false})
  descripcion!: string

  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.tipoVehiculo, {cascade: [Cascade.ALL],lazy: true})
  vehiculos = new Collection<Vehiculo>(this)
}