const express = require("express")
//configuração da rota
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response) {
  response.json({
    nome: 'Simara Conceição',
    minibio:'Desenvolvedora e instrutora'
  })
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta ", porta)
}

//segunda parte da rota => cria o endereço
app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)
