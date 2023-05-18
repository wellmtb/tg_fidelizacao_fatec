import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import bodyParser from "body-parser";
import { Database } from "./database.js"
import { randomUUID } from 'crypto';

const app = express();
const port = 3333;
//Body Parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const database = new Database



const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

// main route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/home.html'))
});

app.get('/RegistrarUsuario', (req, res) => {
  res
    .sendFile(path.join(__dirname, 'views/RegistrarUser.html'))    
});

app.get('/ConsultarPontos', (req, res) => {
  res
    .sendFile(path.join(__dirname, 'views/ConsultarPontos.html'))
});


app.get('/RegistrarVendas', (req, res) => {
  res
    .sendFile(path.join(__dirname, 'views/RegistrarVendas.html'))
});
app.get('/RegistrarCliente', (req, res) => {
  res
    .sendFile(path.join(__dirname, 'views/RegistrarCliente.html'))
});
app.get('/config', (req, res) => {
  res
    .sendFile(path.join(__dirname, 'views/config.html'))
});


// Rotas de usuários
app.get('/users', (req, res) => {
  const users = database.select('users');      
  return res.end(JSON.stringify(users))
});



app.post('/users', (req, res) => {
  const { name , email, tel, password } = req.body;
  console.log(req.body)
  /*
    TODO
    - Encriptar a senha do usuário antes de salvar no banco.
    - Verificar se o usuário já existe antes de criá-lo
    - Validar dados obrigatorios
  */
  const user = {  
    id: randomUUID(),
    name,
    email,
    tel,
    password,
    createdAt :  new Date().toLocaleString('pt-br')
  }
   
  database.insert('users', user) 
  return res
    .writeHead(201).end()
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body

  const userFound = database.findById("users", id);
  if(!userFound) {
    return res.status(404).send("Usuário não encontrado")
  }

  const userUpdated = {
    ...userFound,
    name,
    email
  }
  
  database.update('users', id, userUpdated)
  return res.writeHead(204).end() 
});

app.delete('/users/:id', (req, res) => {
  const { id }= req.params;

  const userFound = database.findById("users", id);
  if(!userFound) {
    return res.status(404).send("Usuário não encontrado")
  }
      
  database.delete('users', id)
  return res.writeHead(204).end() 
});

// Rotas de clientes
app.get('/customers', (req, res) => {
  const customers = database.select('customers');      
  return res.end(JSON.stringify(customers))
});

app.post('/customers', (req, res) => {
  const { name , cpf,  email, tel, endereco, num } = req.body;
  console.log(req.body)
  /*
    TODO
    - Encriptar a senha do usuário antes de salvar no banco.
    - Verificar se o usuário já existe antes de criá-lo
    - Validar dados obrigatorios
  */
  const customer = {  
    id: randomUUID(),
    name,
    cpf,
    email,
    tel,
    endereco,
    num,
    createdAt :  new Date().toLocaleString('pt-br')
  }
   
  database.insert('customers', customer) 
  return res
    .writeHead(201).end()

});

app.put('/customers/:id', (req, res) => {
  const { id } = req.params;
  const { name , cpf,  email, tel, endereco, num  } = req.body

  const customerFound = database.findById("customers", id);
  if(!customerFound) {
    return res.status(404).send("Usuário não encontrado")
  }

  const customerUpdated = {
    ...customerFound,
    name,
    cpf,
    email,
    tel,
    endereco,
    num,
  }
  
  database.update('customers', id, customerUpdated)
  return res.writeHead(204).end() 
});

app.delete('/customer/:id', (req, res) => {
 console.log('TODO')
});


// Rotas de vendas
app.get('/sales', (req, res) => {
  const sales = database.select('sales')
    
  return res
      .end(JSON.stringify(sales))
});

app.post('/sales', (req, res) => {
  const { cpf, tel, valorVenda} = req.body;
  console.log(req.body)
  /*
    TODO
    - Encriptar a senha do usuário antes de salvar no banco.
    - Verificar se o usuário já existe antes de criá-lo
    - Validar dados obrigatorios
  */
  const sale = {  
    id: randomUUID(),
    cpf,
    tel,
    valorVenda,
    Pontos :  Math.floor(valorVenda/10),
    createdAt :  new Date().toLocaleString('pt-br')
  }
   console.log(sale)
  database.insert('sales', sale) 
  return res
    .writeHead(201).end()

});

app.put('/sales/:id', (req, res) => {
  console.log("TODO")
});

app.delete('/sales/:id', (req, res) => {
  console.log("TODO")
});


/*
Configurações de parametros do sistema

*/ 
app.post('/config', (req, res) => {
  const { fatordepontos } = req.body;
  console.log(req.body)
  
  const fator = {  
    id : 1,
    fatordepontos,
    updateddAt :  new Date().toLocaleString('pt-br')
  }
   
  database.insert('fatordepontos', fator) 
  return res
    .writeHead(201).end()

});





// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
