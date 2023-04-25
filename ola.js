// tatiiaquinto
// jN5A7dzWHkHIrlzd
// mongodb+srv://tatiiaquinto:<password>@clustermulheres.jorzawm.mongodb.net/?retryWrites=true&w=majority
const express = require("express")
//configuração da rota
const router = express.Router()

const app = express()
const porta = 3333

function mostraOla(request, response) {
  response.send("olá, mundo!")
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta ", porta)
}
//Segunda parte da config da rota: cria o endereço /ola e chama a função
app.use(router.get('/ola', mostraOla))
app.listen(porta, mostraPorta)