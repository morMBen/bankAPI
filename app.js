const express = require('express');
const app = express();
const PORT = 3000;
const { getAllClients, getClientsData, addNewClient } = require('./utils.js')


app.use(express.json())

// Get specific client data.
app.get('/api/clients/:id', (req, res) => {
    try {
        res.status(200).send(getClientsData(req.params.id))
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

// Get All clients data.
app.get('/api/clients', (req, res) => {
    res.status(200).send(getAllClients())
})

// Add new client.
app.post('/api/clients', (req, res) => {
    // console.log(req.body)
    try {
        res.status(200).send(addNewClient(req.body))
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.listen(PORT, () => {
    console.log('listening...')
})