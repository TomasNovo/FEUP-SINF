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
                        <label className="appidLabel">Name</label>
                        <input id="name0" type="text" placeholder="name"/>
                        <label className="appidLabel">AppID</label>
                        <input id="clientId0" type="text" placeholder="Client ID"/>
                        <label className="appsecLabel">AppSecret</label>
                        <input id="clientSecret0" type="password" placeholder="Client Secret"/>
                        <label className="appidLabel">Tenant</label>
                        <input id="tenant0" type="text" placeholder="tenant"/>
                        <label className="appidLabel">Organization</label>
                        <input id="organization0" type="text" placeholder="organization"/>
                    </div>
                    <div id="accountInfo2">
                        <h1>Account Info 2</h1>
                        <label className="appidLabel">Name</label>
                        <input id="name1" type="text" placeholder="name"/>
                        <label className="appidLabel">AppID</label>
                        <input id="clientId1" type="text" placeholder="Client ID"/>
                        <label className="appsecLabel">AppSecret</label>
                        <input id="clientSecret1" type="password" placeholder="Client Secret"/>
                        <label className="appidLabel">Tenant</label>
                        <input id="tenant1" type="text" placeholder="tenant"/>
                        <label className="appidLabel">Organization</label>
                        <input id="organization1" type="text" placeholder="organization"/>
                    </div>
                    <div className="break"></div>
                    <Button type="submit" id="update" variant="danger">
                        Update
                    </Button>
                </div>
            </PageTemplate>   
        );
    }

    accountInfo(){
        axios.get('http://localhost:7000/api/company')
        .then((response) => {

            for(let i = 0; i<2; i++){
                let appId = response.data[i].appId;
                let clientSecret = response.data[i].appSecret;
                let name = response.data[i].name;
                let tenant = response.data[i].tenant;
                let organization = response.data[i].organization;

                document.getElementById('clientId'+i).value=appId;
                document.getElementById('clientSecret'+i).value=clientSecret;
                document.getElementById('name'+i).value=name;
                document.getElementById('tenant'+i).value=tenant;
                document.getElementById('organization'+i).value=organization;

            }
            
        })
        .catch((error) =>{
            console.log('Error', error.message);
        })
    }
    
    componentDidMount()
    {
        document.title = "Settings";
        this.accountInfo();
    }
};

export default Settings;