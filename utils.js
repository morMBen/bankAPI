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
        return stringToJson('new-client', client);
    } else {
        throw new Error('The client is all ready exist in the DB!')
    }
}

// return json format
const stringToJson = (message, string) => {
    return JSON.stringify({
        [message]: string
    });
}

// Activate specific client (using saveClient())
const activateClient = (id, isActive) => {
    const clients = getAllClients();
    const index = clients.findIndex((c) => c.id === id)
    checkID(index);
    clients[index] = { ...clients[index], active: isActive }
    saveClients(clients);
    return stringToJson('message', `The client is ${isActive ? 'active' : 'unactive'}`)
}

// Deposit cash to a client (using saveClient())
const depositCash = (id, amount) => {
    const clients = getAllClients();
    const index = clients.findIndex((c) => c.id === id);
    checkID(index);
    checkActivetion(clients, index);
    clients[index] = {
        ...clients[index], cash: clients[index].cash + Number(amount)
    }
    saveClients(clients);
    return stringToJson('message', `The client now have ${clients[index].cash} dollars cash.`)
}

//Update a client credit (only positive numbers)
const updateCredit = (id, creditAmount) => {
    const clients = getAllClients();
    const index = clients.findIndex((c) => c.id === id)
    checkID(index);
    checkActivetion(clients, index);
    checkNumber(creditAmount);
    clients[index] = {
        ...clients[index], credit: Number(creditAmount)
    }
    saveClients(clients);
    return stringToJson('message', `The client now have ${creditAmount} dollars credit`)
}

//Withdraw money from the client account
const withdrawMoney = (id, amount) => {
    const clients = getAllClients();
    const index = clients.findIndex((c) => c.id === id)
    checkID(index);
    checkActivetion(clients, index);
    checkNumber(amount);
    if ((clients[index].cash + clients[index].credit - Number(amount)) >= 0) {
        clients[index] = {
            ...clients[index], cash: clients[index].cash - Number(amount)
        }
        saveClients(clients);
        return stringToJson('message', `The client now have ${clients[index].cash} dollars cash`)
    } else {
        throw new Error(`You have exceeded the maximum amount, The maximum amount to withdraw or transfer is ${clients[index].cash + clients[index].credit} dollars`)
    }
}


// Save clients data to clients.json
const saveClients = (clients) => {
    const dataJSON = JSON.stringify(clients);
    fs.writeFileSync('./db/clients.json', dataJSON);
}

//Check if the ID is currect and if the client is active
const checkActivetion = (clients, index) => {
    if (!clients[index].active) {
        throw new Error('The client is not active! Please activate the client.')
    }
}

//Check if the ID is currect
const checkID = (index) => {
    if (index === -1) {
        throw new Error('There is no user with the specific id!')
    }
}

// Check input number - is number? is positive or equal to zero?
const checkNumber = (num) => {
    if (!Number(num) || Number(num) < 0) {
        throw new Error('The input must be ONLY number - equal or larger to zero')
    }
}

// Transfer money from one client to another
const transferMoney = (params) => {
    withdrawMoney(params.idFrom, params.amount);
    return depositCash(params.idTo, params.amount)
}

// Fetch the clients that are active and have a specified amount of cash.
const filterActive = (params) => {
    const clients = getAllClients();
    const result = clients.filter(c => {
        return c.cash >= params.fromAmount && c.cash <= params.toAmount && c.active === true;
    })
    return result;
}

module.exports = {
    getAllClients,
    getClientsData,
    addNewClient,
    activateClient,
    depositCash,
    updateCredit,
    withdrawMoney,
    transferMoney,
    filterActive
}