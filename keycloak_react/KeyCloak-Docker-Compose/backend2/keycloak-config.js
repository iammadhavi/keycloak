var session = require("express-session");
var Keycloak = require("keycloak-connect");
const chalk = require("chalk");

let keycloak;

var keycloakConfig = {
    "realm": "Keycloak Demo",
    "auth-server-url": "http://localhost:8080/auth/",
    "ssl-required": "external",
    "resource": "react_app",
    "public-client": true,
    "verify-token-audience": true,
    "use-resource-role-mappings": true,
    "confidential-port": 0
  };

function initKeycloak() {
    if (keycloak) {
        console.log("Returning existing Keycloak instance!");
        return keycloak;
    } else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        keycloak = new Keycloak({
            store: memoryStore,
            secret: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwUEk1UTFidWJXVlRxWTVUSHlSZExBM1Vwekh5TXdFQnc0MkNvTWVrUEhFIn0.eyJleHAiOjE2MTEwNjM2NDgsImlhdCI6MTYxMTA1MjIyMCwiYXV0aF90aW1lIjoxNjExMDI3NjQ4LCJqdGkiOiI3NDkwMzY2OS1hZTkwLTQ2NTItODNmNS0yZWE2YTVlOWE2ZmYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvVGVzdFJlYWxtIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjM2NjMzMTljLTkxNDMtNDU2Mi1iOTZhLTY2YTA1MjlkMDYwYSIsInR5cCI6IkJlYXJlciIsImF6cCI6InJlYWN0LXdlYi1hcHAiLCJub25jZSI6IjdiNDJmYTRjLTczMGMtNDRmOC05YjE3LTFjNzdhOWU3YmQ1MyIsInNlc3Npb25fc3RhdGUiOiI1MzIxNDNhOC1lZTdkLTRkYzQtYjFkNi1jYzI1N2EzOTE2OTkiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJhcHAtdXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWN0LXdlYi1hcHAiOnsicm9sZXMiOlsidXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgY2xpZW50X3JvbGVzX3JlYWN0LXdlYi1hcHAgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoidXNlcjEiLCJ0b2tlbl9jbGFpbV9uYW1lIjpbInVzZXIiXX0.UIEpaDBxCnRgznRvj0gT2K6zBAlHtSQi3fg2GxbBv8U2aAFF2ppHJwSkB7Xz9HOafWy-6IRolj7WAItVJTUn-u-cOTSZrbzzoIT5qx1HqIYI4OwtPhg402_GNUnHxa0cw77Kd1HeLUBW4aiOlRysg4K-61U_awXEt9wLZ1ORpvkcRN-By-sA9dUTGv-l-KakSfM0pQNcs1RDSLG83EZk5ZPOJdUXzj1Zrw5MB_iesNQXhjnGzEoBZyzOY95LWT4ysqYkZGIkWSDcUOdSnKbMKotznHUdrSjk_Bdn_oYcdP5tHZSb-4Rz6UR9MM1WfWWrVSOulh3cuG7V6pHBpzuzqg',
            resave: false,
            saveUninitialized: true,
        }, keycloakConfig)
        return keycloak;
    }
}

module.exports = {
    initKeycloak
}