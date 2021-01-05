const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./db.js');


const config = {
    user: "sa",
    password: "Champs76",
    server: "localhost",
    database: "redo_fp",
    options: {
        "encrypt": true,
        "enableArithAbort": true},
    key: "c*rryME2safety",
    port: 1432
};

const jwt = require('jsonwebtoken');
const tokenExpirationTime = 1440
const tokenNeededPath = express.Router();


app.listen(5000, function () { console.log(`Listening on port 5000`) })
app.set('key', config.key)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


tokenNeededPath.use((req, res, next) => {
    const token = req.headers.accesstoken;
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
    db.collection('transactions').deleteOne({ _id: ObjectId(req.query._id) }).then(result => {
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
    db.collection('transactions').findOneAndUpdate({ _id: ObjectId(req.body._id) }, {
        $set: {
            type: req.body.type,
            amount: req.body.amount,
            description: req.body.description,
            lastUpdated: req.body.lastUpdated
        }
    }).then(result => {
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

app.post("/users", tokenNeededPath, async function (req, res) {
    let result = await db.query(config,
        `INSERT INTO dbo.users VALUES (
            '${req.body.date}',
            '${req.body.username}',
            '${req.body.fullname}',
            '${req.body.password}',
            ${req.body.entered},
            ${req.body.lastUpdated})`
    )

    if (result.rowsAffected[0] === 1) {
        res.json({
            result: true,
            message: "",
            data: result
        });
    } else {
        res.json({
            result: false,
            message: "Couldn't add the user to the database.",
            data: error
        });
    }
});

app.post('/login', async function (req, res) {
    let result = await db.query(config,
        `SELECT *
            FROM dbo.users
            WHERE username = '${req.body.username}'
                AND password = '${req.body.password}'`)
    payload = { check: true }

    if (result.rowsAffected[0] === 1) {
        res.json({
            result: true,
            message: "",
            data: result.recordset[0],
            token: jwt.sign(payload, app.get('key'), { expiresIn: tokenExpirationTime })
        })
    } else {
        res.json({
            result: false,
            message: "Wrong username or password",
            data: null
        })
    }

});