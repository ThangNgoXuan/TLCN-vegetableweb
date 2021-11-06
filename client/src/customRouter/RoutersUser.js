import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from '../pages/home'
import Catalog from '../pages/catalog'
import Cart from '../pages/cart'
import Product from '../pages/product'
import Intro from '../pages/intro'
import Contact from '../pages/contact'
import Login from '../pages/login'
import Register from '../pages/register'

const RoutesUser = () => {
    return (
        <Switch>
            <Route path='/product/:id' exact component={Product} />
            <Route path='/catalog' exact component={Catalog} />
            <Route path='/cart' component={Cart} />
            <Route path='/intro' component={Intro} />
            <Route path='/contact' component={Contact} />
            <Route path='/cart' component={Cart} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/' exact component={Home} />
        </Switch>
    )
}

export default RoutesUser
