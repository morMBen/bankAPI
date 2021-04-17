const express = require('express');
const app = express();
const PORT = 3000;
const {
    getAllClients,
    getClientsData,
    addNewClient,
    activateClient,
    depositCash
} = require('./utils.js')


app.use(express.json())


//Activate user by ID
app.put('/api/clients/:id/active', (req, res) => {
    try {
        res.status(201).send(activateClient(req.params.id, true))
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

//Unactivate user by ID
app.put('/api/clients/:id/unactive', (req, res) => {
    try {
        res.status(201).send(activateClient(req.params.id, false))
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

// Deposit cash to a user
app.put('/api/clients/:id/:amount', (req, res) => {
    try {
        res.status(201).send(depositCash(req.params.id, req.params.amount))
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

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
    try {
        res.status(201).send(addNewClient(req.body))
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.listen(PORT, () => {
    console.log('listening...')
})