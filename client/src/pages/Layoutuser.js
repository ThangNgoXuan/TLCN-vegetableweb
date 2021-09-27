import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import '../styles/index.scss'

import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductViewModal from '../components/ProductViewModal';

import Routes from '../customRouter/RoutersUser';

const Layoutuser = () => {
    return (
        <BrowserRouter>
        H
        <Route render={props => (
            <div>
                <Header {...props} />
                <div className="container">
                    <div className="main">
                        <Routes/>
                    </div>
                </div>
                <Footer/>
                <ProductViewModal/>
            </div>
        )}/>
        </BrowserRouter>
    
    
      );
}

export default Layoutuser
