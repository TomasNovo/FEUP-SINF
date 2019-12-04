import React from 'react';
import './Inventory.css';
import PageTemplate from '../PageTemplate/PageTemplate';

class Inventory extends React.Component
{
    render()
    {
        return (
            <PageTemplate page="inventory">
                <div id="inventory">
                    <div id="inventory-header">
                        <span>Name</span>
                        <span>Category</span>
                        <span>ID Company A</span>
                        <span>ID Company B</span>
                        <span>Stock A</span>
                        <span>Stock B</span>
                        <span>Price / Unit</span>
                    </div>
                    <div id="inventory-data">
                        <div className="inventory-row">
                            <span>Grape Juice Can</span>
                            <span>TAN</span>
                            <span>29</span>
                            <span>33</span>
                            <span>77</span>
                            <span>3526</span>
                            <span>0.80€</span>
                        </div>
                        <hr/>
                        <div className="inventory-row">
                            <span>Grape Juice Can</span>
                            <span>TAN</span>
                            <span>29</span>
                            <span>33</span>
                            <span>77</span>
                            <span>3526</span>
                            <span>0.80€</span>
                        </div>
                        <hr/>
                        <div className="inventory-row">
                            <span>Grape Juice Can</span>
                            <span>TAN</span>
                            <span>29</span>
                            <span>33</span>
                            <span>77</span>
                            <span>3526</span>
                            <span>0.80€</span>
                        </div>
                        <hr/>
                        <div className="inventory-row">
                            <span>Grape Juice Can</span>
                            <span>TAN</span>
                            <span>29</span>
                            <span>33</span>
                            <span>77</span>
                            <span>3526</span>
                            <span>0.80€</span>
                        </div>
                        
                    </div>
                </div>
            </PageTemplate>
        );
    }

    componentDidMount()
    {
        document.title = "Inventory";
    }
}

export default Inventory;