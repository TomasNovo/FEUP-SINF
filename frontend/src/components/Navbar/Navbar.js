import React from 'react';
import './Navbar.scss';
import logo from '../../assets/logo.png';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Navbar extends React.Component 
{
    constructor(props) 
	{
		super(props);

		this.state = 
		{
			page: props.page
        };
	}

	componentDidMount()
	{
        document.getElementById("nav-" + this.state.page).classList.add("active");

        if(this.state.page === "warehouses" || this.state.page === "inventory"){
            document.querySelector("#master-data > .card .card-header").classList.add("active");
            document.querySelector("#master-data > .card").classList.add("active");
        }
            
    }

	render()
	{
		return (
			<nav className="nav-side-menu">
				<div className="logo">
					<img src={logo} alt="Intercomp"></img>
				</div>
                
                <div className="menu-list">
                    <ul id="menu-content" className="menu-content collapse out">
                        <li id="nav-processes">
                            <Link to="/">
                                <span role="img" aria-label="Processes">🔨</span>
                                Processes
                            </Link>
                        </li>
                        <Accordion id="master-data">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="master-data">
                                        <span role="img" aria-label="Master Data">📁</span>
                            		    Master Data
                                    </Accordion.Toggle>
                                </Card.Header>   
                                <Accordion.Collapse id="collapseMasterData" eventKey="master-data">
                                    <Card.Body>
                                        <Link id="nav-inventory" to="/inventory">Inventory</Link>
                                        <Link id="nav-warehouses" to="/warehouses">Warehouses</Link>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card> 
                        </Accordion>
                            
                        <li id="nav-logs" data-toggle="collapse" data-target="#service" className="collapsed">
                            <Link to="/logs">  
                            <span role="img" aria-label="Logs">📋</span>
                            Logs
                            </Link>
                        </li>  
                        
                        <li id="nav-settings">
                            <Link id="nav-settings" to="/settings">
                                <span role="img" aria-label="Settings">⚙️</span>
                                Settings
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
		);
	}
}

export default Navbar;