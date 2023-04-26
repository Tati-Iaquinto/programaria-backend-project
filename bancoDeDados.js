const mongoose = require('mongoose')
require('dotenv').config()

//processo assíncrono para esperar outra função 
async function conectaBancoDeDados() {
  try {
    console.log('Conexão com o banco de dados iniciou')

    //espera uma execução para que o mongoose conecte
    await mongoose.connect(process.env.MONGO_URL)

    console.log('Conexão com o banco de dados feita com sucesso')

  } catch(erro) {
    console.log(erro)
  }
  
}

module.exports = conectaBancoDeDados