const express = require('express');
const app = express();
const PORT = 3000;
const { getAllClients, getClientsData } = require('./utils.js')

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

})

app.listen(PORT, () => {
    console.log('listening...')
})