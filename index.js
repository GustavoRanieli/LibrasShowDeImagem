// Setando a porta e dependências
const PORT = 4537;
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const userRouter = require('./router/router');
// ============ Setando requisições gerais e enviando arquivos staticos ======================

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/'));

// ======================================
// Rotas

app.use('/', userRouter);

// Pegando o Post ======================================

var palavra;
var frame;
app.post('/palavra', (req, res) => {
    palavra = new Array(req.body.palavra.toLowerCase() + " "); // Pegando a palavra enviada
    frame = new Array(req.body.palavra);
    res.redirect('/');
});

// ======================================
// Lendo 3D.txt para por no Iframe 

var iframes;
fs.readFile('./Text/3Diframe.txt', 'utf8', (err, data) => {
    if(err) console.log(err);
    iframes = data.toString().split('\r\n');
});

// ======================================
// Lendo a Black List

var ofenseList;
var cadastrandoPalavra;
var divisao;

fs.readFile('./Text/blackList.txt', 'utf8', (err, data) => {
    if (err)console.log(err);
    ofenseList = data.toString().split('\r\n');
});

// ======================================
// Função de Ler o TXT

var lista;
fs.readFile('./Text/basededados.txt', 'utf8', (err, data) => {
    if(err)console.log(err);
    lista = data.toString().split('\n'); // Após ler armazena em uma variável passando linha por linha
});

// Ao Carregar a página exibe a palavra =========================================================
// Lendo o banco e filtradno a palavra

var arrayPalavra;
var tamanhoPalavra;
var whiteboard;
var error;
var classBtInval;
var classInval;
var iframeURL;
var galeriURL;
var videosURL;
var display3D;



app.get('/', (req, res) => {
fs.readFile('./Text/basededados.txt', 'utf8', (err, data) => { //atualizando lendo novamente
    if(err)console.log(err);
    lista = data.toString().split('\n'); // Após ler armazena em uma variável passando linha por linha
});

let json = JSON.stringify(lista);
let frames = JSON.stringify(iframes);
    // Função que retorna erro caso não encontre no banco de dados
    if(!json.includes(palavra)){
        error = "Palavra não encontrada!";
        arrayPalavra = "⠀⠀⠀⠀⠀⠀⠀⠀⠀";
        classBtInval = "Cadastro";
        classInval = "Invalido";
        whiteboard = "None";
        iframeURL = ""

    }else if(json.includes(palavra)){

        for(; i <= iframes.length; i++) {
            if(iframes[i].includes(frame)){
                let filtro = iframes[i].slice(iframes[i].indexOf(",") + 1);
                    if(filtro.indexOf(frame) <= 0 ){
                        iframeURL = iframes[i].slice("", iframes[i].indexOf(','));
                        videosURL = `https://www.bing.com/videos/search?q=${frame} educação infantil`;
                        galeriURL = `https://www.bing.com/images/search?q=${frame}`;
                        display3D = '';
                    }  
                    break
            }
            
            if(iframes[i].includes("Final")){
                galeriURL = `https://www.bing.com/images/search?q=${frame}`;
                videosURL = `https://www.bing.com/videos/search?q=${frame} educação infantil`;
                display3D = 'None';
                break
            };
        }
        
        // Função de encontrar e filtrara palavra
        lista.forEach((valor, indice) => {
                if(valor.includes(palavra)){
                        let filtro = valor.slice('', valor.indexOf('(')); // Para falicitar o filtro, corto tudo que vier depois do (... nome masculino):
                            if(filtro.indexOf(palavra) <= 0){ // Para todos os resultados verdadeiros, quero que me retorne apenas o exato
                                limpandoTexto = valor.slice(valor.indexOf(':') + 1); // Corto tudo que vier antes dos dois pontos
                                arrayPalavra = limpandoTexto.split('-');
                                tamanhoPalavra = arrayPalavra.length;
                                classBtInval = "None";
                                classInval = "None";
                                whiteboard = "Whiteboard";
                            }
                }
        });
        error = "";
    }
    res.render('./View/index.ejs', {palavra: arrayPalavra, tamanho: tamanhoPalavra, invalido: error, classBtInval, classInval, whiteboard, iframe: iframeURL, galeriURL, videosURL, display3D}); // Alimento as variaveís no Ejs pelo Backend
    libry = ''
});

// =======================================================================================================
// cadastrando nova palavra 

app.post('/cadastro', (req, res) => {
    cadastrandoPalavra = req.body.cadastrandoPalavra.toLowerCase();
    divisao = ' ' + req.body.divisao.toLowerCase();
    palavraCompleta = cadastrandoPalavra + ' ():' + divisao;

    let listJson = JSON.stringify(ofenseList);
    let json = JSON.stringify(lista);

        if(listJson.includes(cadastrandoPalavra) == true){
            res.redirect('/indevido');
        }else{
            if(json.includes(cadastrandoPalavra) == true){
                res.redirect('/errorPalavra') ; 
            }else{
                fs.appendFile('./Text/basededados.txt', '\n' + palavraCompleta, (err) => {
                    if(err) throw err;
                        console.log('Palavra Cadastrada');
                })
                res.redirect('/');
            }
        };  
});

// ==========================================================

app.listen(PORT, () => {
    console.log(`Server open in ${PORT}`);
});