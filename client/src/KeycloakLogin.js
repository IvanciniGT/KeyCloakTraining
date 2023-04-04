import React, { Component } from 'react'
import Keycloak from "keycloak-js"
import decode from 'jwt-decode'
import JSONPretty from 'react-json-pretty'

const Config = { 
    url: 'https://3.251.70.242:8443',
    realm: 'training',
    clientId: 'react',
    onLoad: 'login-required',
    scope: 'mobile'
}

class KeycloakLogin extends Component {

    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false};
                                     // ^ Contiene la respuesta que nos da Keycloak cuando nos logueamos (TOKEN)
                    // ^ Contiene información de la CONEXION a nuestro KEYCLOAK
    }
// DOM ???
    componentDidMount() {
        const keycloak = Keycloak(Config);
        keycloak.init({onLoad: 'login-required'}).then(authenticated => {
            this.setState({ keycloak: keycloak, authenticated: authenticated })
            
            
            fetch("http://3.251.70.242:8086/test/admin", {
            headers: {
              "Authorization": "Bearer "+keycloak.token,
            }})
            .then(      (response) => response.text()        )
            .then((text) => console.log(text))
            .catch(error => console.log(error));
            
            
            
            
            fetch("http://3.251.70.242:8086/test/user", {
            headers: {
              "Authorization": "Bearer "+keycloak.token,
            }})
            .then((response) => response.text())
            .then((text) => console.log(text))
            .catch(error => console.log(error));
            
        });
        
    }

    render() {
        if (this.state.keycloak && this.state.authenticated ) {
            var jwt = JSON.stringify(decode(this.state.keycloak.token));
            return <div  style={ {"marginLeft": "10%"} }>
                        
                        <div>
                            <JSONPretty id="json-pretty" data={jwt}></JSONPretty>
                        </div>
                        
                        <div style={ {"wordBreak": "break-all","width": "80%"} }>
                            {this.state.keycloak.token}
                        </div>
                        
                    </div>
        } else {
            return <div>Waiting for KeyCloak login</div>
        }
    }

}

export default KeycloakLogin
