// Imports

const fs = require('fs')
const bodyParser = require('body-parser')
bodyParser.json()


    // Variaveis que são preenchidas com null ou na função
    var indevido;
    var repetida;

    // Controler com as funções para facilitar manutenção
    const readFile = {

        register: function ( req, res ){
            res.render('./View/cadastro.ejs')
        },

        invalid: function ( req, res ){
            indevido = 'Palavra Indevida'
            res.render('View/indevido.ejs', {indevido})
        },

        errorWord: function ( req, res ){
            repetida = 'Palavra já cadastrada, atenção aos acentos ou -'  
            res.render('View/errorPalavra.ejs', {repetida})
        },

        whiteboard: function ( req, res ){
            res.render('View/whiteboard.ejs')
        },

        libras: function ( req, res ){
            res.render('View/Libras.ejs')
        }
    }

module.exports = readFile

