const express = require('express');
const cors = require('cors');
// const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();
// app.use(favicon(__dirname + './build/favicon.png'));
let corsOptions = {
    origin: "https://gods123.herokuapp.com",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get("/products/:id", cors(corsOptions), function (req, res) {
    res.json({msg: "This is CORS-enabled for only example.com."});
});
//здесь наше приложение отдаёт статику
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

//простой тест сервера
app.get('/ping', function (req, res) {
    return res.send('pong');
});

//обслуживание html
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);