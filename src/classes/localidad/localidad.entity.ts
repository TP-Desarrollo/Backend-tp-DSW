import { Cascade, Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";
import { Cliente } from "../cliente/cliente.entity.js";

@Entity()
export class Localidad extends BaseEntity {

  @Property({nullable: false})
  nombre!: string

  @Property({nullable: false})
  provincia!: string

  @OneToMany(() => Cliente, (cliente) => cliente.localidad, {cascade: [Cascade.ALL]})
  clientes = new Collection<Cliente>(this)

}