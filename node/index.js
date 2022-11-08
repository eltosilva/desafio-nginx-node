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
    database: 'cadastro'
  }

  return mysql.createConnection(config)
}

app.get('/peoples', (req, res) => {

  if(!connection)
    connection = getConnection()

  let html = '<h1>Full Cycle Rocks!</h1>'

  //- Lista de nomes cadastrada no banco de dados.`

  connection.query('select * from people;', (erro, rows)=> {
    
    if(erro) throw erro

    if(rows){
      html += `<table>
      <thead>
        <tr><th>Id</th><th>Nome</th></tr>
      </thead>
      <tbody>`
      rows.forEach(row => {
        html += `<tr><td>${row?.id}</td><td>${row?.nome}</td></th>`
      })
      html += '</body></html>'
    }

    res.send(html)
  })
})

const jsonParser = bodyParser.json()
app.post('/peoples', jsonParser, (req, res) => {

  if(!connection)
    connection = getConnection()
    
  const query = `insert into people (nome) values ('${req.body?.nome}');`
  
  connection.query(query, (erro, rows)=>{
    if(erro) throw erro
    res.send(rows)
  })
})

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
})