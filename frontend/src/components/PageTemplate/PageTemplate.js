import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PageTemplate.css';
import Navbar from '../Navbar/Navbar';

class PageTemplate extends React.Component
{
    render() 
    {
        return (
            <div className="page">
                <Navbar page={this.props.page}/>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
	
};

export default PageTemplate;