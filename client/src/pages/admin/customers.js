import React from 'react'
import { Link } from 'react-router-dom'

import Table from '../../components/admin/Table'

import customerList from '../../fakedata/customers-list.json'

const customerTableHead = [
    '',
    'name',
    'email',
    'phone',
    'total orders',
    'total spend',
    'location'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.total_orders}</td>
        <td>{item.total_spend}</td>
        <td>{item.location}</td>
    </tr>
)

const Customers = () => {
    return (
        <div>
        <div className="row">
            <div className="col-10">
                <h2 className="page-header">
                customers
                </h2>
            </div>
            <div className="col-2">
                <Link to='/admin/newuser'>
                    <div className="slide__item">
                        <div className="sidebar__item-inner active flexcenter">
                            <span>New User</span>
                        </div>
                    </div> 
                </Link>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card__body">
                        <Table
                            limit='10'
                            headData={customerTableHead}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={customerList}
                            renderBody={(item, index) => renderBody(item, index)}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Customers
