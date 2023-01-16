const express = require('express')
const router = express.Router()
const reader = require('../controller/readFile')
const bodyParser = require('body-parser')

// ============ Enviando arquivos staticos ======================
router.use('/node_modules', express.static('node_modules'))
router.use('/Css', express.static('Css'))
router.use('/js', express.static('js'))
router.use('/Fonts', express.static('Fonts'))
router.use('/img', express.static('img'))
router.use('/View', express.static('View'))
router.use('/audio', express.static('audio'))
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// ======================================
router.get('/whiteboard', reader.whiteboard)

router.get('/cadastro', reader.register)

router.get('/indevido', reader.invalid)

router.get('/errorPalavra', reader.errorWord)

router.get('/libras', reader.libras)
// ======================================

module.exports = router