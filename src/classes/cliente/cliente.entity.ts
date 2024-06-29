import { ManyToOne, Entity, Property, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";
import { Localidad } from "../localidad/localidad.entity.js";

@Entity()
export class Cliente extends BaseEntity {

  @Property({nullable: false})
  dni!: number

  @Property({nullable: false})
  nombre!: string

  @Property({nullable: false})
  email!: string

  @Property({nullable: false})
  clave!: string

  @Property({nullable: false})
  apellido!: string

  @ManyToOne(() => Localidad, {nullable: false})
  localidad!: Rel<Localidad>
}