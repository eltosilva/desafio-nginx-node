const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

var connection;

function getConnection(){
  const config = {
    host: 'mysql-server',
    user: 'root',
    password: 'fullcycle',
    database: 'empresa'
  }

  return mysql.createConnection(config)
}

app.get('/clientes', (req, res) => {

  if(!connection)
    connection = getConnection()

  connection.query('select * from clientes;',(erro, rows)=> {
    
    if(erro) console.log(erro)
    res.send(rows)
  })
})

const jsonParser = bodyParser.json()
app.post('/clientes', jsonParser, (req, res) => {

  if(!connection)
    connection = getConnection()
    
  const query = `insert into clientes (nome, nasc) values ('${req.body?.nome}', '${req.body?.nasc}');`
  
  connection.query(query, (erro, rows)=>{
    if(erro) console.log(erro)
    res.send(rows)
  })
})

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
})