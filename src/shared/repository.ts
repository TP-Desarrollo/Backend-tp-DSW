export interface Repository<T> {
  findAll(): T[] | undefined
  findOne(item: {id: number}): T | undefined    //Este id se modifique seguramente segun el autonumber de la BD
  add(item: T): T | undefined
  update(item: T): T | undefined
  delete(item: {id: number}): T | undefined 
}