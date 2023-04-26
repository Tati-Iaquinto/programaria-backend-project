const express = require("express") //inicia o express
const router = express.Router() //configura a primeira parte da rota
const cors = require('cors') 
const conectaBancoDeDados = require('./bancoDeDados')//liga ao banco de dados
conectaBancoDeDados()// ativa a função que da acesso ao banco de dados

const Mulher = require('./mulherModel')

const app = express() //inicia o app
app.use(express.json()) //trata as requisições em json, dá erro 500 sem isso
app.use(cors())
const porta = 3333 //cria a porta

//GET
async function mostraMulheres(request, response) {
  try {
    //tenta comunicação com banco de dados, await faz esperar a conexao com banco de dados
    const mulheresDataBase = await Mulher.find()

    response.json(mulheresDataBase)
  } catch (erro) {
    console.log(erro)
  }
}

//POST
async function criaMulher(request, response) {
  //cria a abstraçao 
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao,
  })
  try {
    //salva a abstração no mongoDB
    const mulherCriada = await novaMulher.save()
    response.status().json(mulherCriada)
  } catch (erro) {
    console.log(erro)
  }
}

//PATCH
async function corrigeMulher(request, response) {
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id)
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

    if (request.body.citacao) {
      mulherEncontrada.citacao = request.body.citacao
    }

    const mulherAtualizadaNaDB = await mulherEncontrada.save()

    response.json(mulherAtualizadaNaDB)

  } catch (erro) {
    console.log(erro)
  }
  
}

//DELETE
async function deletaMulher(request, response) {
  //try e catch para lidar com serviço externo
  try {
    //encontra pela url -> id
    await Mulher.findByIdAndDelete(request.params.id)
    response.json({mensagem: 'Mulher deletada com sucesso'})
  } catch (erro) {
    console.log(erro)
  }
  
}

//PORTA
function mostraPorta() {
  console.log("Servidor criado e rodando na porta ", porta)
}


app.use(router.get('/mulheres', mostraMulheres)) //configura a rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //configura a rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher))
app.use(router.delete('/mulheres/:id', deletaMulher))
app.listen(porta, mostraPorta) // servidor ouvindo a porta