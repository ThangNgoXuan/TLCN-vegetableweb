import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import '../../styles/admin/indexadmin.scss'
import RouterAdmin from '../../customRouter/RouterAdmin'

/* components */
import Sidebar from '../../components/admin/Sidebar'
import Topnav from '../../components/admin/Topnav'

const Layoutadmin = () => {
    return (
        <BrowserRouter>
            <Route render={(props) => (
                <div>
                    <Sidebar {...props} />
                    <div className="layout__content">
                        <Topnav />
                        <div className="layout__content-main">
                            <RouterAdmin />
                        </div>
                    </div>
                </div>
            )} />
        </BrowserRouter>
    )
}

export default Layoutadmin
