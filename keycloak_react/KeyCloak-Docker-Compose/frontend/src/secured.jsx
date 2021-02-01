import React, { Component } from "react";
import Keycloak from "keycloak-js";

class Secured extends Component {

    constructor(props) {
        super(props);
        this.state = { Keycloak: null, authenticated: false };
    }

    componentDidMount() {
        const keycloak = Keycloak("/keycloak.json");
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            this.setState({ keycloak: keycloak, authenticated: authenticated })
            if (authenticated) {
                window.accessToken = keycloak.token;
                console.log(window.accessToken);
                this.setState({token:keycloak.token})
            }
        })
    }

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) return (
                <div><p>This is a keycloak-secured component of your application</p>
                <p>{this.state.token}</p>
                </div>
            ); else return (<div> Unable to authenticate</div>);
        } return (<div>Initializing Keycloak...</div>);
    }
}

export default Secured;