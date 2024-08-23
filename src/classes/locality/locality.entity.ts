import { Cascade, Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";
import { Customer } from "../customer/customer.entity.js";

@Entity()
export class Locality extends BaseEntity {

  @Property({nullable: false})
  name!: string

  @Property({nullable: false})
  province!: string

  @OneToMany(() => Customer, (client) => client.locality, {cascade: [Cascade.ALL]})
  customers = new Collection<Customer>(this)

}