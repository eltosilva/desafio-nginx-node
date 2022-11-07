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

  let html = '<h1>Full Cycle Rocks!</h1>'

  //- Lista de nomes cadastrada no banco de dados.`

  connection.query('select * from clientes;', (erro, rows)=> {
    
    if(erro) throw erro

    if(rows){
      html += `<table>
      <thead>
        <tr><th>Id</th><th>Nome</th><th>Nasc</th></tr>
      </thead>
      <tbody>`
      rows.forEach(row => {
        html += `<tr><td>${row?.id}</td><td>${row?.nome}</td><td>${row?.nasc}</td></th>`
      })
      html += '</body></html>'
    }

    res.send(html)
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