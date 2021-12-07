import React from 'react'
import { Route } from 'react-router-dom';

import '../styles/index.scss'

import Footer from '../components/Footer';
import Header from '../components/Header';

import RoutesUser from '../customRouter/RoutersUser';

const Layoutuser = () => {
    return (
        <Route render={props => (
            <div>
                <Header {...props} />
                <div className="container">
                    <div className="main">
                        <RoutesUser />
                    </div>
                </div>
                <Footer />
            </div>
        )} />
    );
}

export default Layoutuser
