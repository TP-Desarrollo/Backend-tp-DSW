import { Entity,ManyToOne,Property, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";
import { Employee } from "../employee/employee.entity.js";
import { Customer } from "../customer/customer.entity.js";
import { Vehicle } from "../vehicle/vehicle.entity.js";

@Entity()
export class Rental extends BaseEntity {

  @ManyToOne(() => Customer, {nullable: false})
  customer!: Rel<Customer>

  @ManyToOne(() => Employee, {nullable: true}) // The rental might be made by a customer from their account
  employee?: Rel<Employee>

  @ManyToOne(() => Vehicle,{nullable: false})
  vehicle!: Rel<Vehicle>

  @Property({nullable: false})
  startDate!: Date

  @Property({nullable: false})
  endDate!: Date

  @Property({nullable: false})
  status!: string

  @Property({nullable: false})
  price!: number

}