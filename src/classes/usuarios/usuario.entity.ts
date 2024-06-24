import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";

@Entity()
export class Usuario extends BaseEntity {

  @Property({nullable: false})
  dni!: number

  @Property({nullable: false})
  nombre!: string

  @Property({nullable: false})
  email!: string

  @Property({nullable: false})
  contra!: string

  @Property({nullable: false})
  apellido!: string

}