const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator')
const subscriptions = require('./models/subscriptions')
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const erros = [];
const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
const email = body.email

if (email == '' || typeof email == undefined || email == null) {
    erros.push({ mensagem: "Campo email n pode ser vazio" })
}
if (emailRegex.test(email)) {
    erros.push({ mensagem: "Email invalido" })
}
if (erros.length > 0)

    app.get('/index', (req, res) => {
        res.render('index')
    })

app.post('/subscriptions', (req, res) => {
    subscriptions.create({
        email: req.body.email,
        name: req.body.name,
    }).then(() => {
        if (email === req.body.email) { }
        res.send("Inscrição realizada com sucesso!")
    }).catch(err => {
        res.send("Erro ao cadastrar" + err)
    })
})
app.listen(8080)