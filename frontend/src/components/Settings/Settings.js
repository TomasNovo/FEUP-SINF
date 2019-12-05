import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import './Settings.css'
import PageTemplate from '../PageTemplate/PageTemplate';

class Settings extends React.Component 
{
	render() {
		return (
            <PageTemplate page="settings">
                <Container>
                    <div className="accountInfo">
                        <p>Account Info</p>
                        <div className="grant">
                            {/* <p>Grant_Type */}
                            <input type="text" placeholder="Grant Type"/>
                            {/* </p> */}
                        </div>
                        <div className="clientId">
                            {/* <p>Client_ID */}
                            <input type="text" placeholder="Client ID"/>
                            {/* </p> */}
                        </div>
                        <div className="clientSecret">
                            {/* <p>Client_Secret */}
                            <input type="password" placeholder="Client Secret"/>
                            {/* </p> */}
                        </div>
                    </div>
                    <p className="accounting">Intercompany Accounting</p>
                    <div className="Intercompany">
                        <div className="Originating">
                            <h1>Originating Company</h1>
                            <br/>
                            {/* <p>Company Name: </p> */}
                            <input type="text" placeholder="Company Name"/>
                            <br/>
                            <div className="Debit">
                                {/* <p>Debit Account: </p> */}
                                <input type="text" placeholder="Debit Account"/>
                            </div>
                            <div className="Credit">
                                {/* <p>Credit Account: </p> */}
                                <input type="text" placeholder="Credit Account"/>
                            </div>
                        </div>
                        <div className="Destination">
                            <h1>Destination Company</h1>
                            <br/>
                            {/* <p>Company Name: </p> */}
                            <input type="text" placeholder="Company Name"/>
                            <br/>
                            <div className="Debit">
                                {/* <p>Debit Account: </p> */}
                                <input type="text" placeholder="Debit Account"/>
                            </div>
                            <div className="Credit">
                                {/* <p>Credit Account: </p> */}
                                <input type="text" placeholder="Credit Account"/>
                            </div>
                        </div>
                    </div>
                    <div className="Update">
                        <input type="submit" value="Update"/>
                    </div>
                </Container>
            </PageTemplate>   
        );
	}
};

export default Settings;