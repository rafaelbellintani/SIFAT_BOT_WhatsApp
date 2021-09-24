# Whatsbot SIFAT
BOT de WhatsApp para o sistema SIFAT, o bot é responsável por dar as mensagem de boas vindas e avisar os clientes quando alguma compra for realizada em seu nome, caso o cliente tenha limite de crédito para compra a prazo, será avisado o tanto que já foi utilizado, e o valor restante. Construido em NODEJS, FEITO PARA ATÉ 3 PDV's.

OBS.: Não tenho qualquer ligação com a SIFAT.

Qualquer dúvida entre em contato: sakria@protonmail.com

## Pré-requisitos:

*MONGODB

*NodeJS

*VENOM-BOT (npm i --save venom-bot)

*MYSQL (npm i --save mysql)

*MONGOOSE (npm i --save mongoose)

## Versão Sifat e MYSQL:

SIFAT WAITER: 5.21.03

SIFAT ERP: 8.19.09

BANCO DE DADOS MYSQL: 
 *Versões testadas: Db223 e Db224

## Instalação:

Antes de iniciar, é necessário entrar em contato com a empresa fornecedora do SIFAT, e pedir para que criem um usuário e senha em modo consulta no MYSQL, e depois em posse do usuário e senha adicionar no arquivo JS.

1- Instale o NODEJS e o NPM, baixe o arquivo zip do repositório e faça a extração.

2- Abra o CMD (Windows) ou o terminal (LINUX), digite cd e navegue até o diretório da pasta que você extraiu.

3- Instale o venom-bot: npm i --save venom-bot

4- Instale o módulo mysql: npm i --save mysql

5- Instale o módulo mongoose: npm i --save mongoose

6- Execute o projeto digitando node botsifat.js, se for necessário, altere o caminho dos arquivos da Enviroment no começo do arquivo, escaneie o qrcode do WhatsApp no CMD ou terminal e customize as mensagens de acordo com o seu gosto.

## Informações Adicionais:

Caso alguém coloque o WhatsApp no WhatsApp WEB fora do sistema, o sistema automaticamente irá cancelar o WhatsApp WEB do computador em que foi colocado, e reconectará no sistema, já estou trabalhando em uma solução para que se possa usar tanto no computador quanto no sistema ao mesmo tempo.
