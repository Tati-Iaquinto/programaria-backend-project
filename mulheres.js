const express = require("express") //inicia o express
const router = express.Router() //configura a primeira parte da rota
const { v4: uuidv4 } = require('uuid') //baixa a biblio uuid

const app = express() //inicia o app
app.use(express.json()) //trata as requisições em json, dá erro 500 sem isso
const porta = 3333 //cria a porta

//cria a lista inicial de mulheres
const mulheres = [
  {
    id:'1',
    nome: 'Simara Conceição',
    imagem: 'https://github.com/simaraconceicao.png',
    minibio: 'Desenvolvedora e instrutora'
  },
  {
    id:'2',
    nome:'Iana Chan',
    imagem:'https://bit.ly/3JCXBqP',
    minibio:'CEO e fundadora do PrograMaria'
  },
  {
    id:'3',
    nome:'Nina da Hora',
    imagem:'https://bit.ly/3FKpFaz',
    minibio:'Hacker antirracista'
  }
] 

//GET
function mostraMulheres(request, response) {
  response.json(mulheres)
}

//POST
function criaMulher(request, response) {
  const novaMulher = {
    id: uuidv4(),
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
  }
  mulheres.push(novaMulher) //empurra o novo objeto para a lista

  response.json(mulheres) //transforma a resposta em json
}

//PATCH
function corrigeMulher(request, response) {
  function encontraMulher(mulher) {
    //busca uma mulher cujo id é igual ao que foi passado na url da requisição
    if (mulher.id === request.params.id) {
      return mulher
    }
  }

  const mulherEncontrada = mulheres.find(encontraMulher)

  //se um novo nome for alterado no request, altera o nome no corpo
  if (request.body.nome) {
    mulherEncontrada.nome = request.body.nome
  }

  if (request.body.imagem) {
    mulherEncontrada.imagem = request.body.imagem
  }

  if (request.body.minibio) {
    mulherEncontrada.minibio = request.body.minibio
  }

  response.json(mulheres)
}

//PORTA
function mostraPorta() {
  console.log("Servidor criado e rodando na porta ", porta)
}


app.use(router.get('/mulheres', mostraMulheres)) //configura a rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //configura a rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher))
app.listen(porta, mostraPorta) // servidor ouvindo a porta