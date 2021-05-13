const mongoose = require('mongoose');

mongoose.connect('mongodb://ip:porta/database', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Conectado com sucesso ao Banco de Dados!");
}).catch((err)=>{
    console.log("Não foi possível conectar ao banco de dados: " + err);
});
mongoose.set('useFindAndModify', false);

const user = mongoose.model('user', { 
    nome: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    lastSeen: {
        hour: {
            type: Number,
            require: true,
            default: 0,
        },
        minutes: {
            type: Number,
            require: true,
            default: 0,
        },
        days: {
            type: Number,
            require: true,
            default: 0,
        },
    }
});

const sell = mongoose.model('venda', { 
    numeroVenda: {
        type: String,
        required: true
    },
    valorPagamento: {
        type: String,
        required: true
    },
    troco: {
        type: String,
        
    },
    caixa: {
        type: String,
        required:true,
    },
    cf: {
        type: String,
        required: true
    },
    emissao: {
        type: String,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    pedido: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        
    },
    email: {
        type: String,
        
    },
    recebimento:{
        type: String,
        
    }
    
});

exports.user = user;
exports.sell = sell;