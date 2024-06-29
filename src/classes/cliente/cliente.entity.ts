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

  @Property({nullable: false})
  direccion!: string

  @Property({nullable: false})
  telefono!: string     // Revisar despues si es mejor number, porque hay veces que te deja ingresar el +, ej: +54....

  @ManyToOne(() => Localidad, {nullable: false})
  localidad!: Rel<Localidad>
}