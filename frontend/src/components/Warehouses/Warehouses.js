import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import './Warehouses.scss'
import PageTemplate from '../PageTemplate/PageTemplate';
import localization from '../../assets/localization.png';
import graphic from '../../assets/distribution.png';

class Warehouses extends React.Component 
{
	render() {
		return (
            <body>
                <PageTemplate page="warehouses">
                    <Container>
                        <div className="all">
                            <div className="left">
                                <div className="btn-group">
                                <div className="dropdown show">
                                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Dropdown link
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                    </div>
                                </div>
                                <h1>Company A</h1>
                                <div className="localization">
                                    <img src={localization} alt="Localization" width="30" height="31" />
                                    <p>Rua Aval de Baixo nº158</p>
                                </div>
                                <div classNam="assets">
                                    <p>Asset's distribution:</p>
                                    <img src={graphic} alt="Graphic" />
                                </div>
                            </div>
                            <div className="right">
                                <h1>ZE2z</h1>
                            </div>
                        </div>
                    </Container>
                </PageTemplate>
            </body>

        );
	}
};

export default Warehouses;