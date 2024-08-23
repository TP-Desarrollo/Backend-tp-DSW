import { Cascade, Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";
import { Vehicle } from "./vehicle.entity.js";

@Entity()
export class VehicleType extends BaseEntity {

  @Property({nullable: false})
  type!: string

  @Property({nullable: false})
  description!: string

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicleType, {cascade: [Cascade.ALL],lazy: true})
  vehicles = new Collection<Vehicle>(this)
}