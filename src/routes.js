import { randomUUID } from 'node:crypto'
import { Database } from "./database.js"
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database

export const routes =[
  {
    method:'GET',
    path: buildRoutePath('/'),
    handler: (req, res)=>{
           
      return res.send('./views/index.html')
    }


  },
  
  
  {
    method:'GET',
    path: buildRoutePath('/users'),
    handler: (req, res)=>{
      const users = database.select('users')
      
      return res
        .end(JSON.stringify(users))
    }
  },
  {
    method:'POST',
    path: buildRoutePath('/users'),
    handler: (req, res)=>{
      const { name , email, tel, password} = req.body 
     
      const user = {
      
       id: randomUUID(),
       name,
       email,
       tel,
       password,
       createdAt :  new Date().toLocaleString('pt-br')
     }
   
     database.insert('users', user) 
     return res.writeHead(201).end() 
    }
  },
  {
    method:'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res)=>{
      const { id }= req.params
      
      database.delete('users', id)
      return res.writeHead(204).end() 
    }
  },
  {
    method:'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res)=>{
      const { id } = req.params
      const { name, email }= req.body
      console.log(req.body)
      
      database.update('users', id,{
        name,
        email,
      })
      return res.writeHead(204).end() 
    }
  },
  // Sales -------------------------------------
  {
    method:'POST',
    path: buildRoutePath('/sales'),
    handler: (req, res)=>{
      const { cpf , value } = req.body 
     
      const vendas = {
      
       id: randomUUID(),
       cpf,
       value,
     }
   
     database.insert('sales', vendas) 
     return res.writeHead(201).end() 
    }
  },
  {
    method:'GET',
    path: buildRoutePath('/sales'),
    handler: (req, res)=>{
      const users = database.select('sales')
      
      return res
        .end(JSON.stringify(users))
    }
  },
  {
    method:'PUT',
    path: buildRoutePath('/sales/:id'),
    handler: (req, res)=>{
      const { id } = req.params
      const { cpf, value } = req.body
      console.log(req.body)
      
      database.update('sales', id,{
        cpf,
        value
      })
      return res.writeHead(204).end() 
    }
  },
  {
    method:'DELETE',
    path: buildRoutePath('/sales/:id'),
    handler: (req, res)=>{
      const { id }= req.params
      
      database.delete('sales', id)
      return res.writeHead(204).end() 
    }
  

  },

/* Customers ------------------------------------*/

{
  method:'POST',
  path: buildRoutePath('/customer'),
  handler: (req, res)=>{
    const { cpf , value } = req.body 
   
    const vendas = {
    
     id: randomUUID(),
     cpf,
     value,
   }
 
   database.insert('customer', customer) 
   return res.writeHead(201).end() 
  }
},
{
  method:'GET',
  path: buildRoutePath('/customer'),
  handler: (req, res)=>{
    const users = database.select('customer')
    
    return res
      .end(JSON.stringify(customer))
  }
},
{
  method:'PUT',
  path: buildRoutePath('/customer/:id'),
  handler: (req, res)=>{
    const { id } = req.params
    const { cpf, value } = req.body
    console.log(req.body)
    
    database.update('customer', id,{
      cpf,
      value
    })
    return res.writeHead(204).end() 
  }
},
{
  method:'DELETE',
  path: buildRoutePath('/customer/:id'),
  handler: (req, res)=>{
    const { id }= req.params
    
    database.delete('customer', id)
    return res.writeHead(204).end() 
  }


},


]