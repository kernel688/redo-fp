const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 9000
const tokenNeededPath = express.Router();
const tokenExpirationTime = 1440
const config = {
    key: "c*rryME2safety",
    db: "redo-fp",
    user: "kernel688",
    password: "P455forTesting"}
const connectionString = `mongodb+srv://${config.user}:${config.password}@cluster0.clvog.mongodb.net/${config.db}?retryWrites=true&w=majority`
app.listen(port, function () {console.log(`Listening on port ${port}`)})
app.set('key',config.key)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
    
    const { ObjectId } = require('mongodb');
    const MongoClient = require('mongodb').MongoClient
    
    


tokenNeededPath.use((req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, app.get('key'), (err, decoded) => {
            if (err) {
                return res.json({
                    result: false,
                    message: 'Invalid Token',
                    data: null
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token not provided.'
        });
    }
});




MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    
    
    if (err) {
        console.error(err)
    } else {
        console.log('Connected to Database')
    }
    

    const db = client.db(config.db)
    
    app.get('/providers', tokenNeededPath, function (req, res) {
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
    
    app.post("/providers", tokenNeededPath, function (req, res) {
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
    
    app.get('/transactions', tokenNeededPath, function (req, res) {
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

    app.post("/transactions", tokenNeededPath, function (req, res) {
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


    app.get('/deleteTransaction', tokenNeededPath, function (req, res) {
        db.collection('transactions').deleteOne({_id: ObjectId(req.query._id)}).then(result => {
            res.json({
                result: true,
                message: '',
                data: true
            });
        }).catch(error => {
            res.json({
                result: false,
                message: 'Transaction not found in database.',
                data: false
            });
        });
    });

    app.post("/updateTransaction", tokenNeededPath, function (req, res) {
        db.collection('transactions').findOneAndUpdate({_id: ObjectId(req.body._id)},{$set: {
            type: req.body.type,
            amount: req.body.amount,
            description: req.body.description,
            lastUpdated: req.body.lastUpdated
        }}).then(result => {
            res.json({
                result: true,
                message: "",
                data: result
            });
        }).catch(error => {
            res.json({
                result: false,
                message: "Couldn't update the transaction in the database.",
                data: error
            });
        });
    });

    app.post("/users", tokenNeededPath, function (req, res) {
        db.collection('users').insertOne(req.body).then(result => {
            res.json({
                result: true,
                message: "",
                data: result
            });
        }).catch(error => {
            res.json({
                result: false,
                message: "Couldn't add the user to the database.",
                data: error
            });
        });
    });

    app.post("/login", function (req, res) {
        db.collection('users').find({"username": req.body.username, "password": req.body.password}).toArray().then(result => {
            
            payload = {check: true}
            
            if (result.length > 0) {
                res.json({
                    result: true,
                    message: "",
                    data: jwt.sign(payload, app.get('key'), {expiresIn: tokenExpirationTime})
                })
            } else {
                res.json({
                    result: false,
                    message: "Wrong username or password",
                    data: null
                })
            }
            
        }).catch(error => {
            res.json({
                result: false,
                message: "Couldn't reach database",
                data: error
            });
        });
    });

})
            
