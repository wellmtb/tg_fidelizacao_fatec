import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database{
  #database = {}
  
  constructor(){
  fs.readFile(databasePath,'utf8')
    .then(data =>{
      this.#database = JSON.parse(data)
  })
  .catch(()=> {
    this.#persist()
  })
  } 

  #persist(){
  fs.writeFile(databasePath, JSON.stringify(this.#database))

  }

  select(table, search) {
    let data = this.#database[table] ?? [];
  
    if (Object.keys(search).length === 0) {
      // Se o parâmetro de pesquisa estiver vazio, retorna todos os usuários
      return data;
    }
  
    data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
        const rowValue = row[key];
        return typeof rowValue === 'string' && rowValue.includes(value) ||
               Array.isArray(rowValue) && rowValue.includes(value);
      });
    });
  
    return data;
  }
  
  findById(table, id){
  
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    
    if(rowIndex > -1){
      return this.#database[table][rowIndex]
    }
    return false;
  }

  insert(table, data){
  if (Array.isArray(this.#database[table])) {
    this.#database[table].push(data)
    
  } else {
    this.#database[table] = [data]
  }
  this.#persist();
  return data;
    }


  delete(table, id){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    
    if(rowIndex > -1){
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
    }
    
  update(table, id, data){
  
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    
    if(rowIndex > -1){
      this.#database[table][rowIndex] ={id, ...data}
      this.#persist()
    }
    }
}