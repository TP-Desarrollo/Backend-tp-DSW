import { Entity, OneToMany, Property, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";
import { Rental } from "../rental/rental.entity.js";

@Entity()
export class Employee extends BaseEntity {

  @Property({nullable: false})
  idNumber!: number

  @Property({nullable: false})
  firstName!: string

  @Property({nullable: false})
  email!: string

  @Property({nullable: false})
  password!: string

  @Property({nullable: false})
  lastName!: string

  @OneToMany(() => Rental, rental => rental.employee, {cascade: [Cascade.ALL]})
  rentals = new Collection<Rental>(this)
}