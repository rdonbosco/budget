const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();

const port = 8200;

app.use(helmet.noSniff());

app.use(helmet.xssFilter());

app.use(helmet.frameguard());

app.use(express.static(__dirname + '/Budget-app'));

app.get('/*', (req, res) => res.sendFile(__dirname + '/Budget-app/index.html'));

app.listen(() => {
    console.log(`Server listening on the port::${port}`);
});
