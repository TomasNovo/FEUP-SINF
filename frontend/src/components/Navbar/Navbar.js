import React from 'react';
import './Navbar.scss';
import logo from '../../assets/logo.png';

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
                            <a href="./">
                                <span role="img" aria-label="Processes">🔨</span>
                                Processes
                            </a>
                        </li>
                        <li className="accordion" id="master-data">
                            <div className="card">
                                <div className="card-header" id="inventory">
                                    <h2 className="mb-0">
                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseMasterData" aria-expanded="true" aria-controls="collapseMasterData">
                                            <span role="img" aria-label="Master Data">📁</span>
                            		        Master Data
                                        </button>
                                    </h2>
                                </div>   
                                <div id="collapseMasterData" className="collapse" aria-labelledby="inventory" data-parent="#master-data">
                                    <a href="./">Inventory</a>
                                    <a href="./">Warehouses</a>
                                </div>
                            </div> 
                        </li>        
                        <li id="nav-logs" data-toggle="collapse" data-target="#service" className="collapsed">
                            <a href="./">  
                                <span role="img" aria-label="Logs">📋</span>
                                Logs
                            </a>
                        </li>  
                        <li id="nav-settings">
                            <a href="./" className="settings">
                                <span role="img" aria-label="Settings">⚙️</span>
                                Settings
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
		);
	}
}

export default Navbar;