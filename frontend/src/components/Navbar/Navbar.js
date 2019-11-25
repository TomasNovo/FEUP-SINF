import React from 'react';
import './Navbar.scss';

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
			<nav class="nav-side-menu">
                <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
                <div class="menu-list">
                    <ul id="menu-content" class="menu-content collapse out">
                        <li>
                            <a href="./">
                                <span role="img" aria-label="Processes">🔨</span>
                                Processes
                            </a>
                        </li>
                        <li data-toggle="collapse" data-target="sub" role="button" class="collapsed active" aria-expanded="false" aria-controls="products">
                            <a href="#products"> 
                                <span role="img" aria-label="Master Data">📁</span>
                                Master Data
                                <span class="arrow"></span>
                            </a>
                        </li>
                                
                        <ul class="sub-menu collapse" id="products">
                            <li class="active"><a href="./">CSS3 Animation</a></li>
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
        
                        <li data-toggle="collapse" data-target="#service" class="collapsed">
                            <a href="./">  
                                <span role="img" aria-label="Logs">📋</span>
                                Logs
                                <span class="arrow"></span>
                            </a>
                        </li>  
                        <ul class="sub-menu collapse" id="service">
                            <li>New Service 1</li>
                            <li>New Service 2</li>
                            <li>New Service 3</li>
                        </ul>
                        <li>
                            <a href="./" class="settings">
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