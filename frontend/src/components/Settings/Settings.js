import React from 'react';
import Button from "react-bootstrap/Button";
import './Settings.css'
import PageTemplate from '../PageTemplate/PageTemplate';

class Settings extends React.Component 
{
	render() {
		return (
            <PageTemplate page="settings">
                <div id="settings-wrapper">
                    <div id="accountInfo">
                        <h1>Account Info</h1>
                        <input id="grant" type="text" placeholder="Grant Type"/>
                        <input id="clientId" type="text" placeholder="Client ID"/>
                        <input id="clientSecret" type="password" placeholder="Client Secret"/>
                    </div>
                    <div id="originating">
                        <h1>Originating Company</h1>
                        <input className="company-name" type="text" placeholder="Company Name"/>
                        <input className="debit" type="text" placeholder="Debit Account"/>
                        <input className="credit" type="text" placeholder="Credit Account"/>
                    </div>
                    <div id="destination">
                        <h1>Destination Company</h1>
                        <input className="company-name" type="text" placeholder="Company Name"/>
                        <input className="debit" type="text" placeholder="Debit Account"/>
                        <input className="credit" type="text" placeholder="Credit Account"/>
                    </div>
                    <div class="break"></div>
                    <Button type="submit" id="update" variant="danger">
                        Update
                    </Button>
                </div>
            </PageTemplate>   
        );
    }
    
    componentDidMount()
    {
        document.title = "Settings";
    }
};

export default Settings;