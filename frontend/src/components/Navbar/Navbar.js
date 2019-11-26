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
		//TODO set hover effect depending on the page
	}

	render()
	{
		return (
			<nav className="nav-side-menu">
				<div className="logo">
					<img src={logo} height="90"></img>
				</div>
                
                <div className="menu-list">
                    <ul id="menu-content" className="menu-content collapse out">
                        <li>
                            <a href="./">
                                <span role="img" aria-label="Processes">🔨</span>
                                Processes
                            </a>
                        </li>
                        <li data-toggle="collapse" data-target="sub" role="button" className="collapsed active" aria-expanded="false" aria-controls="products">
                            <a href="#products"> 
                                <span role="img" aria-label="Master Data">📁</span>
                            		Master Data
                                <span className="arrow"></span>
                            </a>
                        </li>

                        <ul className="sub-menu collapse" id="products">
                            <li className="active"><a href="./">CSS3 Animation</a></li>
                            <li><a href="./">General</a></li>
                            <li><a href="./">Buttons</a></li>
                            <li><a href="./">Tabs & Accordions</a></li>
                            <li><a href="./">Typography</a></li>
                            <li><a href="./">FontAwesome</a></li>
                            <li><a href="./">Slider</a></li>
                            <li><a href="./">Panels</a></li>
                            <li><a href="./">Widgets</a></li>
                            <li><a href="./">Bootstrap Model</a></li>
                        </ul>
        
                        <li data-toggle="collapse" data-target="#service" className="collapsed">
                            <a href="./">  
                                <span role="img" aria-label="Logs">📋</span>
                                Logs
                            </a>
                        </li>  
                        <ul className="sub-menu collapse" id="service">
                            <li>New Service 1</li>
                            <li>New Service 2</li>
                            <li>New Service 3</li>
                        </ul>
                        <li>
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