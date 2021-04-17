const fs = require('fs');


// Get All clients data from clients.json
const getAllClients = () => {
    try {
        const dataBuffer = fs.readFileSync('./db/clients.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}
const getClientsData = (id) => {
    const clients = getAllClients();
    const client = clients.find((c) => {
        return c.id === id;
    })
    if (client) {
        return client;
    } else {
        throw new Error('There is no user with the specific id!')
    }
}

module.exports = {
    getAllClients,
    getClientsData,
}