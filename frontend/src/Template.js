import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Template.scss'
import logo from './resources/logo.png'

class Template extends React.Component 
{
	render() {
		return (
        <body>
            <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"/>
            
            <div className="logo">
                <img src={logo} alt="Logo" width="90" height="87" />
            </div>
            <div class="nav-side-menu">
                <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
            
                    <div class="menu-list">
            
                        <ul id="menu-content" class="menu-content collapse out">
                            <li>
                            <a href="#">
                            🔨 Processes
                            </a>
                            </li>

                            <li data-toggle="collapse" data-target="sub" role="button" class="collapsed active" aria-expanded="false" aria-controls="products">
                                <a href="#products"> 📁 Master Data
                                <span class="arrow"></span>
                                </a>
                            </li>
                            
                            <ul class="sub-menu collapse" id="products">
                                <li class="active"><a href="#">CSS3 Animation</a></li>
                                <li><a href="#">General</a></li>
                                <li><a href="#">Buttons</a></li>
                                <li><a href="#">Tabs & Accordions</a></li>
                                <li><a href="#">Typography</a></li>
                                <li><a href="#">FontAwesome</a></li>
                                <li><a href="#">Slider</a></li>
                                <li><a href="#">Panels</a></li>
                                <li><a href="#">Widgets</a></li>
                                <li><a href="#">Bootstrap Model</a></li>
                            </ul>


                            <li data-toggle="collapse" data-target="#service" class="collapsed">
                            <a href="#">  📋  Logs<span class="arrow"></span></a>
                            </li>  
                                <ul class="sub-menu collapse" id="service">
                                <li>New Service 1</li>
                                <li>New Service 2</li>
                                <li>New Service 3</li>
                                </ul>

                            <li>
                            <a href="#" classe="settings">
                            ⚙️ Settings
                            </a>
                            </li>
                        </ul>
                </div>
            </div>
            <div className="info">
                
            </div>
        </body>  
		);
	}
};

export default Template;