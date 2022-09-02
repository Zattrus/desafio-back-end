const express = require('express')
const app = express();
const subscriptions = require('./models/subscriptions')
const bodyParser = require('body-parser')
const message_flow = require('./models/message_flow')

app.use(bodyParser.json())
app.use(express.json());
app.set('view engine', 'ejs');

function emailValidation(email) {
    subscriptions.findOne({ where: { email: email } }).then((subscription) => {
        if (subscription) {
            console.log("Email já cadastrado")
            return true
        } else {
            console.log("Email não cadastrado")
            return false
        }
    })
}

app.post('/subscriptions', (req, res) => {
    const { email, name } = req.body;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const subscription_date = `${year}-${month}-${day}`;


    if (emailValidation(email)) {
        return res.status(400).json({ error: "Email invalido" });
    } else {
        subscriptions.create({
            name,
            email,
            last_message: 1,
            subscription_date,
            active: true,
        }).then(() => {
            return res.json({ message: "Inscrito com sucesso" });
        }).catch((error) => {
            return res.status(400).json({ error: error.message });
        })
    }
})

app.get('/subscriptions', (req, res) => {
    subscriptions.findAll().then((subscriptions) => {
        return res.json(subscriptions);
    }).catch((error) => {
        return res.status(400).json({ error: error.message });
    });
})

app.post('/message_flow', (req, res) => {
    const { template_name, position } = req.body;
    message_flow.create({
        template_name,
        position
    }).then(() => {
        return res.json({ message: "Mensagem criada com sucesso" });
    }).catch((error) => {
        return res.status(400).json({ error: error.message });
    })
})

app.get('/message_flow', (req, res) => {
    message_flow.findAll().then((message_flow) => {
        return res.json(message_flow);
    }).catch((error) => {
        return res.status(400).json({ error: error.message });
    });
})

app.get('/subscriptions/:id', (req, res) => {
    const { id } = req.params;
    subscriptions.findOne({ where: { id: id } }).then((subscription) => {
        return res.json(subscription);
    }).catch((error) => {
        return res.status(400).json({ error: error.message });
    });
})

app.put('/subscriptions/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, last_message, active } = req.body;
    subscriptions.update({
        name,
        email,
        last_message,
        active
    }, { where: { id: id } }).then(() => {
        return res.json({ message: "Inscrição atualizada com sucesso" });
    }).catch((error) => {
        return res.status(400).json({ error: error.message });
    });
})


app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
})