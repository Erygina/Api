const soap = require('soap');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const url = 'http://localhost:8001/imt?wsdl';


const start = async () => {
    const client = await soap.createClientAsync(url);
    const app = express();

    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    app.use(cors());


    app.post('/GetIMT', async (req, res) => {
        const args = req.body;
        try {
            const result = await client.GetIMTAsync(args);
            res.send(result[0]);
        } catch (e) {
            console.log(e)
        }
    })

    app.listen(8000, function () {
        console.log('Soap server started at port 8000...');
    });
}

start();
