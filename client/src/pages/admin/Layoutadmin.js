import React from 'react'
import { Route } from 'react-router-dom'
import '../../styles/admin/indexadmin.scss'
import RouterAdmin from '../../customRouter/RouterAdmin'

/* components */
import Sidebar from '../../components/admin/Sidebar'
import Topnav from '../../components/admin/Topnav'

const Layoutadmin = () => {
    return (
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
    )
}

export default Layoutadmin
