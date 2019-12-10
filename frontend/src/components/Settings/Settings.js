import React from 'react';
import Button from "react-bootstrap/Button";
import './Settings.css'
import PageTemplate from '../PageTemplate/PageTemplate';
import axios from 'axios';

class Settings extends React.Component 
{
	render() {
		return (
            <PageTemplate page="settings">
                <div id="settings-wrapper">
                    <div id="accountInfo1">
                        <h1>Account Info 1</h1>
                        <label className="appidLabel">AppID</label>
                        <input id="clientId" type="text" placeholder="Client ID"/>
                        <label className="appsecLabel">AppSecret</label>
                        <input id="clientSecret" type="password" placeholder="Client Secret"/>
                    </div>
                    <div id="accountInfo2">
                        <h1>Account Info 2</h1>
                        <label className="appidLabel">AppID</label>
                        <input id="clientId1" type="text" placeholder="Client ID"/>
                        <label className="appsecLabel">AppSecret</label>
                        <input id="clientSecret1" type="password" placeholder="Client Secret"/>
                    </div>
                    <div className="break"></div>
                    <Button type="submit" id="update" variant="danger">
                        Update
                    </Button>
                </div>
            </PageTemplate>   
        );
    }

    accountInfo1(){
        axios.get('http://localhost:7000/api/company/0')
        .then((response) => {
            let appId = response.data[0].appId;
            let clientSecret = response.data[0].appSecret;

            document.getElementById('clientId').value=appId;
            document.getElementById('clientSecret').value=clientSecret;
        })
        .catch((error) =>{
            console.log('Error', error.message);
        })
    }

    accountInfo2(){
        axios.get('http://localhost:7000/api/company/1')
        .then((response) => {
            let appId = response.data[0].appId;
            let clientSecret = response.data[0].appSecret;

            document.getElementById('clientId1').value=appId;
            document.getElementById('clientSecret1').value=clientSecret;
        })
        .catch((error) =>{
            console.log('Error', error.message);
        })
    }
    
    componentDidMount()
    {
        document.title = "Settings";
        this.accountInfo1();
        this.accountInfo2();
    }
};

export default Settings;