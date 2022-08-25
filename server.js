const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')
const { body, validationResult } = require('express-validator')
const subscriptions = require('./models/subscriptions')
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'chavealeatoria',
    resave: false,
    saveUninitialized: true
}))
const erros = [];
const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;


app.get('/index', (req, res) => {
    res.render('index')
})

app.post('/subscriptions', (req, res) => {
    const email = req.body.email;
    if (email == '' || typeof email == undefined || email == null) {
        erros.push({ mensagem: "Campo email não pode ser vazio" })
    }
    if (emailRegex.test(email)) {
        res.send(erros.push({ mensagem: "Email invalido" }))
    }
    if (erros.length > 0) {
        console.log(erros);
        req.session.erros = erros;
        req.session.success = true;
        return res.send({ mensagem: "Campo email não pode ser vazio" });
    }

    subscriptions.create({
        email: req.body.email,
        name: req.body.name
    }).then(() => {
        console.log('validação realizada com sucesso')
        req.session.success = true
        return res.send({ mensagem: "validação realizada com sucesso" });
    }).catch(function (erro) {
        res.send(`Erro ao cadastrar: ${erro}`)
    })
})

app.listen(8080)