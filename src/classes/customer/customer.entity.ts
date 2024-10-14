import { ManyToOne, Entity, Property, Rel, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";
import { Locality } from "../locality/locality.entity.js";
import { Rental } from "../rental/rental.entity.js";

@Entity()
export class Customer extends BaseEntity {

  @Property({nullable: false})
  dni!: number

  @Property({nullable: false})
  firstName!: string

  @Property({nullable: false})
  email!: string

  @Property({nullable: false})
  password!: string

  @Property({nullable: false})
  lastName!: string

  @Property({nullable: false})
  address!: string

  @Property({nullable: false})
  phone!: string     // Review later if it's better as number, because sometimes it allows entering +, e.g.: +54....

  @ManyToOne(() => Locality, {nullable: false})
  locality!: Rel<Locality>

  @OneToMany(() => Rental, rental => rental.customer, {cascade: [Cascade.ALL]})
  rentals = new Collection<Rental>(this)
  
}