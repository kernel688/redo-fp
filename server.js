const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const connectionString = "mongodb+srv://kernel688:P455forTesting@cluster0.clvog.mongodb.net/redo-fp?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    

    if (err) {
        console.error(err)
    } else {
        console.log('Connected to Database')
    }
    
    app.listen(9000, function () {
        console.log('listening on 9000')
    })
    

    const db = client.db('redo-fp')
    

    app.get('/providers', function (req, res) {
        db.collection('providers').find({}).toArray().then(data => {
            res.json({
                result: true,
                message: '',
                data: data
            });
        }).catch(error => {
            res.json({
                result: false,
                message: 'Providers data not found in database.',
                data: data
            });
        });
    });

    app.post("/providers", function (req, res) {
        console.log(req.body);
        db.collection('providers').insertOne(req.body).then(result => {
            res.json({
                result: true,
                message: "",
                data: result
            });
        }).catch(error => {
            res.json({
                result: false,
                message: "Couldn't add the provider to the database.",
                data: error
            });
        });
    });

    app.get('/transactions', function (req, res) {
        db.collection('transactions').find({}).toArray().then(data => {
            res.json({
                result: true,
                message: '',
                data: data
            });
        }).catch(error => {
            res.json({
                result: false,
                message: 'Transactions data not found in database.',
                data: data
            });
        });
    });

    app.post("/transactions", function (req, res) {
        console.log(req.body);
        db.collection('transactions').insertOne(req.body).then(result => {
            res.json({
                result: true,
                message: "",
                data: result
            });
        }).catch(error => {
            res.json({
                result: false,
                message: "Couldn't add the transactions to the database.",
                data: error
            });
        });
    });


})

