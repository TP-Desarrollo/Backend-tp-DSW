import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";

@Entity()
export class Localidad extends BaseEntity {

  @Property({nullable: false})
  nombre!: string

  @Property({nullable: false})
  provincia!: string

}