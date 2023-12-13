const express = require('express');
const soap = require('soap');

const serviceSide = {
    service: {
        servicePort: {
            GetIMT: async function (args) {
                const { weight, height } = args;
                let imt = (weight/((height/100)*(height/100))).toFixed(2)
                return {
                    imt: imt
                };
            },
        }
    }
};

const xml = require('fs').readFileSync('imt.wsdl', 'utf8');

const server = express();

server.listen(8001, function () {
    soap.listen(server, '/imt', serviceSide, xml, function () {
        console.log('Soap client started at port 8001...');
    });
});
