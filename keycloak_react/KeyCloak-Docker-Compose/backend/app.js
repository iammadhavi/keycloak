var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var Keycloak = require('keycloak-connect');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());

// Enable CORS support
app.use(cors());

// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.

var memoryStore = new session.MemoryStore();

// Provide the session store to the Keycloak so that sessions
// can be invalidated from the Keycloak console callback.
//
// Additional configuration is read from keycloak.json file
// installed from the Keycloak web console.

var keycloakConfig = {
  "realm": "Keycloak Demo",
  "auth-server-url": "http://localhost:8080/auth/",
  "ssl-required": "external",
  "resource": "react_app",
  "verify-token-audience": true,
  "credentials": {
    "secret": "679d10f3-e317-47f8-ac44-fbd4798887b4"
  },
  "use-resource-role-mappings": true,
  "confidential-port": 0
};

var keycloak = new Keycloak({
  store: memoryStore
}, keycloakConfig);

app.use(session({
  secret: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwUEk1UTFidWJXVlRxWTVUSHlSZExBM1Vwekh5TXdFQnc0MkNvTWVrUEhFIn0.eyJleHAiOjE2MTEwNjI1NDAsImlhdCI6MTYxMTA1Njg5NCwiYXV0aF90aW1lIjoxNjExMDI2NTQxLCJqdGkiOiIzYTUzODMxNC1hNzZjLTRkYzUtYmVjYi0xNDZhMzdhZGYxZGUiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvVGVzdFJlYWxtIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjM2NjMzMTljLTkxNDMtNDU2Mi1iOTZhLTY2YTA1MjlkMDYwYSIsInR5cCI6IkJlYXJlciIsImF6cCI6InJlYWN0LXdlYi1hcHAiLCJub25jZSI6IjRkOWQwYmYwLTdlMjMtNGNmZC05MGZiLTZlM2ZlMjYwOWY2YiIsInNlc3Npb25fc3RhdGUiOiIxNGI0YTdiNi0wYjEzLTQ0ZDEtOTMwYy00YmI1Y2I4OTY4NDUiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm5vZGUtdXNlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJhcHAtdXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWN0LXdlYi1hcHAiOnsicm9sZXMiOlsidXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgY2xpZW50X3JvbGVzX3JlYWN0LXdlYi1hcHAgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoidXNlcjEiLCJ0b2tlbl9jbGFpbV9uYW1lIjpbInVzZXIiXX0.KmJNogD_VBp8QD1psJUcM_h_6UVIgxXd0PDxUmgsnDSiBh6TJp0iKOk5sz3UVbFfPThHr6Tem5dpZisEuixECiMpf-oRnrqu-AX_6OTltJcqRoTtIK6dR82EsapwBg8Rt5abW-J-BuwOVcUkh60M2DGEgwrowuNIClO1zzuRNiIyg8cNi7VpE71LmzIL7q3siHHmShaZRm9IpnMjYXZbwvu4BAy5NZEpaROnSErwPZc6pAQRivldLnXuDEZxt7IfUqN-py3jjodL7nESbS9H8sNsxXzhZ5-35-9vBWshm_Y9r5XgBsHOUee-U1D6tW8_2ayl64zc9GJB6EpOLgS8dA',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));


app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/'
}));

app.get('/service/public', function (req, res) {
  res.json({ message: 'public' });
});

app.get('/service/secured', keycloak.protect('user'), function (req, res) {
  res.json({ message: 'secured' });
});

app.get('/service/admin', keycloak.protect('admin'), function (req, res) {
  res.json({ message: 'admin' });
});

app.use('*', function (req, res) {
  res.send('Not found!');
});

app.listen(5000, function () {
  console.log('Started at port 5000');
});
