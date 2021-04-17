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

//  Get specific client data from clients.json
const getClientsData = (id) => {
    const clients = getAllClients();
    const client = clients.find((c) => c.id === id)
    if (client) {
        return client;
    } else {
        throw new Error('There is no user with the specific id!')
    }
}

// Add new client to data (using saveClient())
const addNewClient = (client) => {
    const clients = getAllClients();
    const findDuplicate = clients.find(c => c.id === client.id)
    if (!findDuplicate) {
        if (!client.id || !client.id.length === 9) {
            throw new Error('The id must be 9 digits with numbers only!')
        }
        if (!client.first || client.first.length === 0) {
            throw new Error('You must enter first name with letters only!')
        }
        if (!client.last || client.last.length === 0) {
            throw new Error('You must enter last name with letters only!')
        }
        clients.push({
            id: client.id,
            first: client.first,
            last: client.last,
            name: `${client.first} ${client.last}`,
            active: false,
            credit: client.credit ? client.credit : 0,
            cash: client.cash ? client.cash : 0,
        });
        saveClients(clients);
        return client;
    } else {
        throw new Error('The client is all ready exist in the DB!')
    }
}

// Save clients data to clients.json
const saveClients = (clients) => {
    const dataJSON = JSON.stringify(clients);
    fs.writeFileSync('./db/clients.json', dataJSON);
}

// Activate specific user (using saveClient())
const activateClient = (id, isActive) => {
    const clients = getAllClients();
    const index = clients.findIndex((c) => c.id === id)
    // const client = clients.find((c) => c.id === id)
    if (index !== -1) {
        clients[index] = { ...clients[index], active: isActive }
        saveClients(clients);
        return `The client is ${isActive ? 'active' : 'unactive'}`
    } else {
        throw new Error('There is no user with the specific id!')
    }
}

const unactivateClient = () => {

}

module.exports = {
    getAllClients,
    getClientsData,
    addNewClient,
    activateClient,
    unactivateClient,
}