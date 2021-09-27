import React from 'react'
import { Route, Switch } from 'react-router'
import Dashboard from '../pages/admin/dashboard'
import Products from '../pages/admin/products'
import Customers from '../pages/admin/customers'
import NewUser from '../pages/admin/newuser'
import User from '../pages/admin/user'
import Setting from '../pages/admin/setting'
import Categories from '../pages/admin/categories'
import Analytics from '../pages/admin/analytics'
import Orders from '../pages/admin/orders'
import NewProduct from '../pages/admin/newproduct'
const RouterAdmin = () => {
    return (
        <Switch>
            <Route  path='/admin' exact component={Dashboard}/>
            <Route path='/admin/products' component={Products}/>
            <Route path='/admin/newproduct' component={NewProduct}/>
            <Route path='/admin/customers' component={Customers}/>
            <Route path='/admin/newuser' component={NewUser}/>
            <Route path='/admin/user' component={User}/>
            <Route path='/admin/setting' component={Setting}/>
            <Route path='/admin/categories' component={Categories}/>
            <Route path='/admin/analytics' component={Analytics}/>
            <Route path='/admin/orders' component={Orders}/>


        </Switch>
    )
}

export default RouterAdmin
