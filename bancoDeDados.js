const mongoose = require('mongoose')

//processo assíncrono para esperar outra função 
async function conectaBancoDeDados() {
  try {
    console.log('Conexão com o banco de dados iniciou')

    //espera uma execução para que o mongoose conecte
    await mongoose.connect('mongodb+srv://tatiiaquinto:jN5A7dzWHkHIrlzd@clustermulheres.jorzawm.mongodb.net/?retryWrites=true&w=majority')

    console.log('Conexão com o banco de dados feita com sucesso')

  } catch(erro) {
    console.log(erro)
  }
  
}

module.exports = conectaBancoDeDados