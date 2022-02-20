# Whatsbot SIFAT
BOT de WhatsApp para o sistema SIFAT, Feito em NODE.JS, o bot é responsável por dar as mensagem de boas vindas de acordo com o que for programado e avisar aos clientes quando alguma compra foi realizada em seu nome, caso o cliente tenha limite de crédito para compra a prazo, será avisado a quantidade já utilizada, e o valor disponível. Construido em NODEJS, FEITO PARA ATÉ 3 PDV's.

OBS.: Não tenho qualquer ligação com a SIFAT.

## Tecnologias utilizadas:

*Mongo

*NodeJS

*Venom-Bot

*Mysql

*Mongoose

## Versão Sifat e MYSQL:

SIFAT WAITER: 5.21.03

SIFAT ERP: 8.19.09

BANCO DE DADOS MYSQL: 
 *Versões testadas: Db223 e Db224

## Instalação:

Antes de iniciar, é necessário entrar em contato com a empresa fornecedora do sistema SIFAT, e pedir para que criem um usuário e senha em modo consulta no MYSQL, e depois em posse do usuário e senha adicionar no arquivo JS.

1- Instale o NodeJS em conjunto com o NPM e dê um git clone nesse repositório.

2- Abra o CMD (Windows) ou o terminal (LINUX), digite cd e navegue até o diretório do repositório clonado.

3- Instale todos os módulos digitando npm install

4- Execute o projeto digitando node botsifat.js, se for necessário, altere o caminho dos arquivos da Enviroment no começo do arquivo, escaneie o qrcode do WhatsApp no terminal do seu SO e customize as mensagens de acordo com o seu gosto.

## Informações Adicionais:

Caso alguém coloque o WhatsApp no WhatsApp WEB fora do sistema, o sistema automaticamente irá cancelar o WhatsApp WEB do computador em que foi colocado, e reconectará no sistema, já estou trabalhando em uma solução para que se possa usar tanto no computador quanto no sistema ao mesmo tempo.
