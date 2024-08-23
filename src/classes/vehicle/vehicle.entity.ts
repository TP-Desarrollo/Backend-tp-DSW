import { Entity, ManyToOne, OneToMany, Property, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";
import { VehicleType } from "./vehicleType.entity.js";
import { Rental } from "../rental/rental.entity.js";

@Entity()
export class Vehicle extends BaseEntity {

  @Property({nullable: false})
  licensePlate!: string

  @Property({nullable: false})
  brand!: string

  @Property({nullable: false})
  model!: string

  @Property({nullable: false})
  status!: string

  @ManyToOne(() => VehicleType, {nullable: false})
  vehicleType!: VehicleType

  @OneToMany(() => Rental, rental => rental.vehicle, {cascade: [Cascade.ALL]})
  rentals = new Collection<Rental>(this)

}