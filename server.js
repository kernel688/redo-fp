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
        encrypt: true,
        enableArithAbort: true,
    },
    key: "c*rryME2safety",
    port: 1432
};

const jwt = require('jsonwebtoken');
const tokenExpirationTime = 14400
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

app.get('/providers', tokenNeededPath, async function (req, res) {
    
    let result = await db.query(config, `SELECT * FROM dbo.providers ORDER BY country, idnumber`)
    payload = { check: true }

    if (result.recordset.length > 0) {
        res.json({
            result: true,
            message: "",
            data: result.recordset,
            token: jwt.sign(payload, app.get('key'), { expiresIn: tokenExpirationTime })
        })
    } else {
        res.json({
            result: false,
            message: 'Providers data not found in database.',
            data: null
        })
    }



});

app.post("/providers", tokenNeededPath, async function (req, res) {
    console.log(req.body.date);
    let result = await db.query(config,
        `INSERT INTO dbo.providers VALUES (
            CONVERT(date,'${req.body.date}',103),
            ${req.body.idnumber},
            '${req.body.fullname}',
            '${req.body.country}',
            ${req.body.hidden},
            ${req.body.entered},
            ${req.body.lastupdated})`
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
            message: "Couldn't add the provider to the database.",
            data: error
        });
    }
});

app.get('/transactions', tokenNeededPath, async function (req, res) {
    let result = await db.query(config, `SELECT * FROM dbo.transactions ORDER BY _id DESC`)
    payload = { check: true }

    if (result.recordset.length > 0) {
        res.json({
            result: true,
            message: "",
            data: result.recordset,
            token: jwt.sign(payload, app.get('key'), { expiresIn: tokenExpirationTime })
        })
    } else {
        res.json({
            result: false,
            message: 'Transactions data not found in database.',
            data: null
        })
    }

});

app.post("/transactions", tokenNeededPath, async function (req, res) {
    console.log(req.body.date);
    let result = await db.query(config,
        `INSERT INTO dbo.transactions ([date],[type],[amount],[description],[entered],[lastupdated]) VALUES (
            CONVERT(date,'${req.body.date}',103),
            '${req.body.type}',
            ${req.body.amount},
            '${req.body.description}',
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
            message: "Couldn't add the transactions to the database.",
            data: error
        });
    }

});

app.get('/deleteTransaction', tokenNeededPath, async function (req, res) {
    let result = await db.query(config,
        `DELETE FROM dbo.transactions WHERE [_id] = ${req.query._id}`
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
            message: "Transacion not deleted.",
            data: error
        });
    }


});

app.post("/updateTransaction", tokenNeededPath, async function (req, res) {

    let result = await db.query(config,
        `UPDATE dbo.transactions
        SET [amount] = ${req.body.amount}, [description] = '${req.body.description}', [type] = '${req.body.type}', [lastUpdated] = ${req.body.lastUpdated}
        WHERE [_id] = ${req.body._id};`
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
            message: "Transaction couldn't be updated",
            data: error
        });
    }

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