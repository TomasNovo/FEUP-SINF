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
                        <li data-toggle="collapse" data-target="sub" role="button" className="collapsed" aria-expanded="false" aria-controls="products">
                            <a href="#products"> 
                                <span role="img" aria-label="Master Data">📁</span>
                            		Master Data
                                <span className="arrow"></span>
                            </a>
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