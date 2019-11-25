import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PageTemplate.css';
import logo from '../../assets/logo.png';
import Navbar from '../Navbar/Navbar';

class PageTemplate extends React.Component
{
    render() 
    {
        return (
            <div className="content">
                <div className="logo">
                    <img src={logo} alt="Logo" width="90" height="87" />
                </div>
                <Navbar page={this.props.page}/>
                <div className="info"></div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
	
};

export default PageTemplate;