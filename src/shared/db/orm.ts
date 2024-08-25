import { MikroORM } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { MySqlDriver } from "@mikro-orm/mysql";

export const orm = await MikroORM.init({
  entities:['dist/**/*.entity.js'],
  entitiesTs:['src/**/*.entity.ts'],
  dbName: "alquiler_autos",
  driver: MySqlDriver, 
  clientUrl: "mysql://dsw:dsw@localhost:3306/alquiler_autos",
  highlighter: new SqlHighlighter(),
  debug: true,
  allowGlobalContext: true,
  schemaGenerator:{ // No usar en produccion
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema:[],
  },
})

export const syncSchema = async () => {   //Genera la bd y actualiza
  const generator = orm.getSchemaGenerator()
  /*
  await generator.dropSchema()    //Lo usamos si fuera necesario rehacer la bd.
  await generator.createSchema()
  */
  await generator.updateSchema()
}