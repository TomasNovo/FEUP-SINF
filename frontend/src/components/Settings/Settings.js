import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import './Settings.css'
import PageTemplate from '../PageTemplate/PageTemplate';

class Settings extends React.Component 
{
	render() {
		return (
            <body>
                <PageTemplate/>
                <Container>
                    <div className="accountInfo">
                        <p>Account Info</p>
                        <div className="grant">
                            <p>Grant_Type
                            <input type="text"/>
                            </p>
                            {/* <input type="text"/> */}
                        </div>
                        <div className="clientId">
                            <p>Client_ID
                            <input type="text"/>
                            </p>
                        </div>
                        <div className="clientSecret">
                            <p>Client_Secret
                            <input type="password"/>
                            </p>
                        </div>
                    </div>
                    <div className="Intercompany">
                        <div className="Originating">
                            <h1>Originatin Company</h1>
                            <br/>
                            <p>Company Name: </p>
                            <input type="text"/>
                            <br/>
                            <div className="Debit">
                                <p>Debit Account: </p>
                                <input type="text"/>
                            </div>
                            <div className="Credit">
                                <p>Credit Account: </p>
                                <input type="text"/>
                            </div>
                        </div>
                        <div className="Destination">
                            <h1>Destination Company</h1>
                            <br/>
                            <p>Company Name: </p>
                            <input type="text"/>
                            <br/>
                            <div className="Debit">
                                <p>Debit Account: </p>
                                <input type="text"/>
                            </div>
                            <div className="Credit">
                                <p>Credit Account: </p>
                                <input type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="Update">
                        <input type="submit" value="Update"/>
                    </div>
                </Container>
            </body>

        );
	}
};

export default Settings;