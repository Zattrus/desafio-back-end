const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator')

app.set('view engine', 'ejs');


// Conexao com BD MySql
const mysql = require('mysql')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/index', (req, res) => {
    res.render('index')
})

app.post('/add-email', (req, res) => {
    res.send('Email: ' + req.body.email);
})

app.post('/validador-email', [
    body('email').isEmail().withMessage('O email precisa ser valido'),
    body('email').custom(value => {
        if (!value) {
            return Promise.reject("Email é obrigatorio")
        }
        if (value == "teste@teste.com") {
            return Promise.reject("Email já cadastrado")
        }
        return true;
    })
], (req, res) => {
    const erro = validationResult(req);
    if (!erro.isEmpty()) {
        return res.status(400).json({ erro: erro.array() })
    }

    res.json({ msg: "Sucesso" })
})

app.listen(8080)