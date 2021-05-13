
const { remove } = require("../BOTSIFAT/Enviroment/database");
const sell = require("../BOTSIFAT/Enviroment/database").sell;
const user = require("../BOTSIFAT/Enviroment/database").user;
const venom = require("../BOTSIFAT/Enviroment/venom");
var messageCounter = 0;
var ip = 'ip banco de dados sifat';
var userdb = 'usuario banco de dados sifat';
var porta = 'porta banco de dados sifat';
var passworddb = 'senha banco de dados sifat';
var databasedb = 'bdsifat'; //Database padrão

    start = (client) => {
        
        const mysql = require('mysql');
        const connection = mysql.createConnection({
        host: ip,
        port: porta,
        user: userdb,
        password: passworddb,
        database: databasedb,
        connectTimeout: 60000,
        });
        connection.connect((err) => {
        if (err) throw err;
        console.log('Conectado com sucesso no IP: ' + ip);
        });

        var credPickOnDB1 = () => {
            return new Promise(n => {
                connection.query('SELECT * FROM cf01 WHERE CAIXA = 1 ORDER BY EMISSAO DESC, HORA desc limit 1', (err,rows) => {  
                            if(rows[0].ESPECIE != 'CN'){
                                var horario = rows[0].HORA;
                                var hora = horario.toString().substring(0,2);
                                var minutos = horario.toString().substring(2,4);
                                var segundos = horario.toString().substring(4,6);
                                console.log(hora + ":" + minutos + ":" + segundos)
                                var numeros = {
                                    numero: rows[0].NUMERO.toString(),
                                    valorPagamento: Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(rows[0].VRLIQUIDO),
                                    caixa: "Caixa 1",
                                    cliente: rows[0].CLIENTE,
                                    taxaEntrega: rows[0].SERVICO,
                                    cf: rows[0].CF,
                                    emissao: rows[0].EMISSAO,
                                    hora: hora + ":" + minutos + ":" + segundos,
                                    pedido: rows[0].PEDIDO,
                                    recebimento: rows[0].NFE_DH_RECBTO,
                                }
                        }
                        n(numeros);                  
                });
            })  
        }

        var credPickOnDB2 = () => {
            return new Promise(n => {
                connection.query('SELECT * FROM cf01 WHERE CAIXA = 2 ORDER BY EMISSAO DESC, HORA desc limit 1', (err,rows) => {
                            if(rows[0].ESPECIE != 'CN'){
                                var horario = rows[0].HORA;
                                var hora = horario.toString().substring(0,2);
                                var minutos = horario.toString().substring(2,4);
                                var segundos = horario.toString().substring(4,6);
                                console.log(hora + ":" + minutos + ":" + segundos)    
                                var numeros = {
                                    numero: rows[0].NUMERO.toString(),
                                    valorPagamento: Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(rows[0].VRLIQUIDO),
                                    caixa: "Caixa 2",
                                    cliente: rows[0].CLIENTE,
                                    taxaEntrega: rows[0].SERVICO,
                                    cf: rows[0].CF,
                                    emissao: rows[0].EMISSAO,
                                    hora: hora + ":" + minutos + ":" + segundos,
                                    pedido: rows[0].PEDIDO,
                                    recebimento: rows[0].NFE_DH_RECBTO,
                                }
                        }
                        n(numeros);                  
                });
            })  
        }

        var searchProducts = () => {
            return new Promise(sp => {

            })
        }

        var credPickOnDB3 = () => {
            return new Promise(n => {
                connection.query('SELECT * FROM cf01 WHERE CAIXA = 3 ORDER BY EMISSAO DESC, HORA desc limit 1', (err,rows) => {
                    console.log(err); 
                    console.log(rows)   
                            if(rows[0].ESPECIE != 'CN'){
                                var horario = rows[0].HORA;
                                var hora = horario.toString().substring(0,2);
                                var minutos = horario.toString().substring(2,4);
                                var segundos = horario.toString().substring(4,6);
                                console.log(hora + ":" + minutos + ":" + segundos)
                                var numeros = {
                                    numero: rows[0].NUMERO.toString(),
                                    valorPagamento: Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(rows[0].VRLIQUIDO),
                                    caixa: "Caixa 3 (DELIVERY)",
                                    cliente: rows[0].CLIENTE,
                                    taxaEntrega: rows[0].SERVICO,
                                    valorLiquido: rows[0].VRLIQUIDO,
                                    cf: rows[0].CF,
                                    emissao: rows[0].EMISSAO,
                                    hora: hora + ":" + minutos + ":" + segundos,
                                    pedido: rows[0].PEDIDO,
                                    recebimento: rows[0].NFE_DH_RECBTO,
                                
                            }
                        }
                        n(numeros);                  
                });
            })  
        }

        var searchNames = (n1) => {
            return new Promise(c => {
                var searchClient = async (c1) => {
                    connection.query('SELECT * FROM cd02 WHERE CODIGO = (' +c1+')', (err,rows) => {
                        console.log(err);
                        console.log(rows);
                            if(rows[0]){
                                console.log(rows[0].NOME)
                                dados = {
                                    nome: rows[0].NOME,     
                                    telefone: rows[0].FAX, 
                                    email: rows[0].EMAIL,
                                    limiteCredito: rows[0].LIMITE_CREDITO,
                                    codigo: rows[0].CODIGO,
                                } 
                                if(dados.telefone == null || dados.telefone == '') {
                                    dados.telefone = rows[0].TELEFONE;
                                } else{
                                }
                            }else{  
                                dados= {
                                    nome: "SEM CADASTRO",
                                    telefone: "SEM CADASTRO",
                                    email: "SEM CADASTRO",
                                }
                            }
                            console.log(dados);
                        
                        c(dados);               
                    })
                }
            searchClient(n1);       
            })
        }

        var saveSellRecords = (v1,v3) =>{
            return new Promise (s=>{
                    if(sell.exists({numeroVenda:v1.numero}, async (err,result)=>{            
                        var dataRecebimento = await pickDate(v1.recebimento);
                        var functionSend = async () => {
                            if(result){
                                console.log("Venda ja cadastrada!");  
                                var connectionState = await client.getConnectionState(); 
                                if(connectionState == 'CONFLICT' || connectionState == 'DISCONNECTED'){
                                    await client.restartService();
                                    connectionState;
                                }              
                        
                            }else{
                                if(v3.codigo == null || v3.codigo == undefined){

                                }else{
                                    var valorTotalTitulo = await searchCreditMonth(v3.codigo);
                                }
                                
                               const novaVenda = await new sell({            
                                    numeroVenda: v1.numero,
                                    valorPagamento: v1.valorPagamento, 
                                    caixa: v1.caixa,
                                    cf: v1.cf,
                                    emissao: v1.emissao,
                                    hora: v1.hora,
                                    pedido: v1.pedido,
                                    nome: v3.nome,
                                    telefone: v3.telefone,
                                    email: v3.email,
                                    recebimento: v1.recebimento,
                                })

                                var salvar = await novaVenda.save()
                                .then(() => console.log("Venda cadastrada com sucesso!")).catch((err)=>{
                                    console.log("Não foi possível cadastrar a venda!: " + err);
                                });
                                var connectionState = await client.getConnectionState(); 
                                if(connectionState == 'CONFLICT' || connectionState == 'DISCONNECTED'){
                                    await client.restartService();
                                    connectionState;
                                }
                                
                                if(valorTotalTitulo == 0 || valorTotalTitulo == "R$ 0,00" || valorTotalTitulo == undefined || valorTotalTitulo == null){
                                    await client.sendText('55'+v3.telefone+'@c.us', 'Olá *' + v3.nome + '* vimos que você '+
                                'realizou uma compra conosco:\n\n' + '*Valor:* ' + v1.valorPagamento + '\n*Data:* ' + dataRecebimento.dayMonth + " " + dataRecebimento.month + "\n*Hora:* " + v1.hora + "\n*Caixa:* " + v1.caixa); 
                                }else{
                                    await client.sendText('55'+v3.telefone+'@c.us', 'Olá *' + v3.nome + '* vimos que você '+
                                'realizou uma compra conosco:\n\n' + '*Valor:* ' + v1.valorPagamento + '\n*Data:* ' + dataRecebimento.dayMonth + " " + dataRecebimento.month + "\n*Hora:* " + v1.hora + "\n*Caixa:* " + v1.caixa + "\n\n" +
                                "Você já utilizou *"+valorTotalTitulo+"* de *" + Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(v3.limiteCredito) + "* do seu limite de crédito na Conveniência do Alameda.");  
                                }
                                
                                
                            }
                        }
                        s(functionSend());
                        
                    }));       
                })
        }
       
var pickDate = (dataRecebimento) => {
    return new Promise(pd => {
        var selectDate = {
            day: dataRecebimento.toString().substring(0,3),
            month: dataRecebimento.toString().substring(4,7),
            dayMonth: dataRecebimento.toString().substring(8,10),
        }

        switch(selectDate.month) {
            case 'Jan':
                selectDate.month = 'de Janeiro';
                break;
            case 'Feb':
                selectDate.month = 'de Fevereiro';
                break;
            case 'Mar':
                selectDate.month = 'de Março';
                break;
            case 'May':
                selectDate.month = 'de Maio';
                break;
            case 'Jun':
                selectDate.month = 'de Junho';
                break;
            case 'Jul':
                selectDate.month = 'de Julho';
                break;
            case 'Aug':
                selectDate.month = 'de Agosto';
                break;
            case 'Sep':
                selectDate.month = 'de Setembro';
                break;
            case 'Oct':
                selectDate.month = 'de Outubro';
                break;
            case 'Nov': 
                selectDate.month = 'de Novembro';
                break;
            case 'Dec':
                selectDate.month = 'de Dezembro';
        }
        console.log(selectDate.month)
        pd(selectDate)
    })
}
        
        var searchCreditMonth = (codigo) =>{
            return new Promise(sc =>{
                var time = new Date();
                var ano = time.getFullYear();
                var mes = time.getMonth()+1;
                var sqlCode = 'SELECT * FROM cf04 WHERE CLIENTE = '+codigo+' and EMISSAO >= "'+ano+'-'+mes+'-01" and EMISSAO <= "'+ano+'-'+mes+'-31"';
                connection.query(sqlCode, (err,rows) => {
                    if(err){
                        console.log(err)
                    }else{
                        var rowsCount = rows.length;
                        var somaTitulos = 0;
                        for(let i=0;i<=rowsCount-1;i++){
                            somaTitulos += rows[i].VALOR;
                        }
                        if(somaTitulos == 0 || somaTitulos == undefined || somaTitulos == null){
                            sc(0)
                        }else{
                            sc(Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(somaTitulos))
                        }
                        
                    }
                    
                })
            })
        }

        var search = async () => {
            
            try{
                var caixa1 = await credPickOnDB1();
                var cliente1 = await searchNames(caixa1.cliente);
                await saveSellRecords(caixa1,cliente1);
            }catch(err){
                console.log("Erro " + err)
            }
            try{
                var caixa2 = await credPickOnDB2();
                var cliente2 = await searchNames(caixa2.cliente); 
                await saveSellRecords(caixa2,cliente2);
            }catch(err){
                console.log("Erro " + err)
            }
            try{
                var caixa3 = await credPickOnDB3();
                var cliente3 = await searchNames(caixa3.cliente); 
                await saveSellRecords(caixa3,cliente3); 
            }catch(err){
                console.log("Erro " + err)
            }         
        }

        var script = async () => {
            await search()
        }
        
        setInterval(script,5000);

        client.onMessage(async (message)=> {
                var timeLimit = 70;
                var numberWithCode = message.from;        
               var numberPhone = (message.from).replace('@c.us','').replace('55','');

               var removeNumber = () => {
                   return new Promise(remove => {
                    var removex = user.findOneAndDelete({telefone:numberPhone},{}).then(()=>{
                        console.log("Número removido com sucesso!");
                        remove(removex);
                    }).catch((err)=>{
                        remove(console.log("Não foi possível remover o número! " + err));
                    });
                   })       
               }
               
               var welcome = async (filter) => {            
                    return new Promise(welcomex => {                      
                        if(filter == true){                      
                            var mensagem = 'Digite aqui sua mensagem de boas-vindas ';;
                            var sendMSG = async () => {
                                await client.sendText(message.from,mensagem);
                                await client.markUnseenMessage(message.from);       
                            }
                            welcomex(sendMSG());
                        }else{
                            
                        }    
                    })
                }
    
                var getName = async () => {
                    return new Promise(nome =>{
                        if(message.sender.name == null){
                            if(message.sender.verifiedName == null || message.sender.verifiedName == ''){
                                var nomex = 'cliente sem nome';
                            }else{
                                var nomex = message.sender.verifiedName;
                            }                
                        }
                        else{
                            var nomex = message.sender.name;
                        }                       
                        nome(nomex);
                    })
                }

                var verifyTime = (nome,numero,hour,minutes,days) => {
                    return new Promise(verify => {                       
                            if(user.exists({telefone:numberPhone}, async (err,result)=>{
                                if(result){
                                    verify(console.log("Número já está cadastrado no banco de dados!"));  
                                }else{
                                    console.log("Número não cadastrado no banco de dados, cadastrando...");
                                    var result = await saveOnDB(nome,numero,hour,minutes,days);
                                    verify(result);
                                }
                            }));                                          
                    })
                }

                var getNumber = async () => {
                    return new Promise(number=>{
                        number((message.from).replace('@c.us','').replace('55',''));
                    })
                }
        
                var setLastSeen = async () => {
                    return new Promise(lastSeen => {
                        var time = new Date();
                        var hour = time.getHours();
                        var minutes = time.getMinutes();
                        var days = time.getDate();

                        var timex = {
                            hour: hour,
                            minutes: minutes,
                            days: days,
                        }
        
                        lastSeen(timex);
                    })
                    
                }

                var saveOnDB = async (nome,numero,hour,minutes,days) => {
                    return new Promise(database=>{
                            const novoUsuario = new user({            
                                nome: nome,
                                telefone: numero,
                                lastSeen: {
                                    hour: hour,
                                    minutes: minutes-timeLimit,
                                    days: days,
                                }
                            });
                            
                            var salvar = novoUsuario.save()
                            .then(() => console.log("Número cadastrado com sucesso!")).catch((err)=>{
                                console.log("Não foi possível cadastrar o número!: " + err);
                            });
        
                            database(salvar);
                    })    
                }

                

                var alterOnDB = (counter) =>{              
                            user.findOne({telefone:numberPhone}, async (err,obj) => {                                                  
                                if(err){
                                    console.log(err);                                   
                                }else if(counter==1){
                                    var alterDB = async (hour,minutes,days) => {
                                        user.findOneAndUpdate({telefone:numberPhone},{lastSeen:{hour:hour,minutes:minutes,days:days}}, (err,doc)=>{
                                            if(err){
                                                console.log("Não foi possível atualizar! " + err);
                                            }else{
                                                
                                                console.log("Número atualizado com sucesso!\n");
                                            }
                                        })
                                    }                               
                                    var lastHour = obj.lastSeen.hour;
                                    var lastMinute = obj.lastSeen.minutes;
                                    var lastDays = obj.lastSeen.days;
                                    var nome = obj.nome;
    
                                    var newTime = await setLastSeen();
    
                                    var hourDelta = Math.abs(lastHour-newTime.hour);
                                    if(hourDelta>0){                                   
                                        var timeDelta =  Math.abs((lastMinute-newTime.minutes)-(60*hourDelta));
                                        //console.log("Hour maior que 0 " + timeDelta)
                                    }else{
                                        var timeDelta = Math.abs(lastMinute-newTime.minutes);
                                        //console.log("Hour menor que 0 " + timeDelta)
                                    }    
                                    var filter = timeDelta >= timeLimit;                                  
                                    if(filter){
                                        console.log("Mensagem será enviada para o número "+ numberPhone + " ("+nome + ")"+ ", passaram " + timeDelta + " minutos de " + timeLimit + " do tempo máximo de inatividade!");
                                        await alterDB(newTime.hour,newTime.minutes,newTime.days);    
                                        messageCounter = 0;  
                                    }else{                                   
                                        console.log("Mensagem NÃO será enviada para o número "+ numberPhone + " ("+nome + ")"+ ", pois passou apenas " + timeDelta + " minutos de " + timeLimit + " do tempo máximo de inatividade!\nResetando tempo de inatividade.");   
                                        await alterDB(newTime.hour,newTime.minutes,newTime.days); 
                                        messageCounter = 0;   
                                    }     
                                    await welcome(filter);
                                                                                                     
                                }else{
                                    a=0;
                                }                                               
                            })                                                                                        
                }
                
                var script = async () => {
                   
                    var numero = await getNumber();
                    var tempo = await setLastSeen();
                    var nome = await getName();
                    await verifyTime(nome,numero,tempo.hour,tempo.minutes,tempo.days);                    
                    messageCounter++;
                    await alterOnDB(messageCounter);  
                                      
                }
                if(message.body != '/delme' && numberPhone != 'status@broadcast' && numberWithCode.includes('@g.us') != true){
                    script();
                }else if(message.body == '/delme'){ //Usado para teste da mensagem de boas vindas, basta digitar /delme no chat do whatsapp para deixar o contador de inatividade no padrão para receber a mensagem. 
                   await removeNumber();
                }else{

                }
        })

       
    }


