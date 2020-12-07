const express = require('express');
const cors = require('cors');
// const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;

const app = express();

let corsOptions = {
    origin: "https://backendtodos2.herokuapp.com",
    optionsSuccessStatus: 200
};

app.get("/*", cors(corsOptions));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
// app.use(favicon(__dirname + '/build/favicon.png'));

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);