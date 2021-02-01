
var express = require("express");
var router = express.Router();
var app = express();

const keycloak = require("./keycloak-config.js").initKeycloak();
console.log(keycloak);
app.use(keycloak.middleware());

router.get('/user', keycloak.protect('user'), function (req, res) {
    res.send("Hello User");
});

router.get('/admin', keycloak.protect('admin'), function (req, res) {
    res.send("Hello Admin");
});

router.get('/all', keycloak.protect(['user', 'admin']), function (req, res) {
    res.send("Hello All");
});

router.get('/', function (req, res) {
    res.send("Server is up");
});

app.listen("5000")