const { response } = require('express');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://marcin240204:Rademenes13@cluster0.dat668z.mongodb.net/?retryWrites=true&w=majority";



async function connect() {
    const client =  new MongoClient(uri);
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("zkontaktowałeś się z MongoDB!");
        return client;
    } catch (e) {
        console.log("Coś sie popsuło error -> " + e);
        process.exit(1);
    }
}

async function getAllListings(client) {
    const collection = await client.db('sample_airbnb').collection('listingsAndReviews');
    let list = collection.find().toArray();
    return list;
}


async function get(client, criteria) {
    const collection = await client.db('sample_airbnb').collection('listingsAndReviews');

    let list = collection.find(criteria).toArray();
    return list;
}

async function add(client, data) {
    const collection = await client.db('sample_airbnb').collection('listingsAndReviews');
    collection.insertOne(data, (error, response) => {
        if(error) {
            console.log("błąd podczas dodawania rekordu!");
            return false;
        } else {
            return true;
        }
    });
}

function close(client) {
    client.close();
    console.log("Rozłączyłeś się z MongoDB");
}

module.exports = {connect, getAllListings, close, get, add}