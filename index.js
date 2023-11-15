const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
const db = require('./db');


app.get('/', async (req, res) => {
    res.send("Siema elo Zrobiony Crud");
})

app.get('/listAll', async (req, res) => {
    res.setHeader('content-type', 'text/html');
    res.write("<h1>Lista AirBNB</h1>");
    const client = await db.connect();
    res.write("<table>");
    let list = await db.getAllListings(client);
    list.forEach(element => {
        res.write("<tr>");
        res.write("<td>" + element.listing_url + "</td>");
        res.write("<td>" + element.name + "</td>");
        res.write("</tr>");
    });
    res.write("</table>");
    db.close(client);
    res.end();
});

app.post('/search', async (req,res) => {
    let criteria = req.body;
    //criteria.name = "/"+criteria.name+"/";
    const client = await db.connect();
    let list = await db.get(client, criteria);
    res.setHeader('content-type', 'text/html');
    res.write("<h1>Lista z Kryteriami</h1>");
    res.write("<table>");
    list.forEach(element => {
        res.write("<tr>");
        res.write("<td>" + element.listing_url + "</td>");
        res.write("<td>" + element.name + "</td>");
        res.write("</tr>");
});
res.write("</table>");
    db.close(client);
    res.end();
});
app.post('/add', async (req, res) => {
    let data = req.body;
    const client = await db.connect();
    let dbResponse = await db.add(client, data);
    if(dbResponse){
        res.setHeader('content-type', 'text/html');
        res.write("<h1>Dodano poprawnie</h1>");
        res.end();
    } else {
        res.setHeader('content-type', 'text/html');
        res.write("<h1>Nastąpił błąd</h1>");
        res.end();
    }
    db.close(client);
    res.end();
});

app.listen(8000);