import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Table from '../../components/admin/Table'
import { listUserAction } from '../../redux/actions/userAction'

import customerList from '../../fakedata/customers-list.json'

const customerTableHead = [
    'STT',
    'Phân loại',
    'Avatar',
    'Tên',
    'Email',
    'SĐT',
    'Địa chỉ',
    'Sửa',
    'Xóa'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{index}</td>
        <td>{item.role}</td>
        <td><img src={item.avatar} alt='Hình ảnh' style={{ width: '30px' }} /></td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.address}</td>
        <td>chưa làm</td>
        <td>chưa làm</td>
    </tr>
)

const Customers = () => {

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listUserAction())
    }, [dispatch])
    return (
        <div>
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">
                        Quản lý người dùng
                    </h2>
                </div>
                <div className="col-2">
                    <Link to='/admin/newuser'>
                        <div className="slide__item">
                            <div className="sidebar__item-inner active flexcenter">
                                <span>Thêm mới</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                loading ? <div>Loading...</div> : error ? <div>{error}</div>
                                    : users && users.length <= 0 ? <div>Không có người dùng nào</div> :
                                        <Table
                                            limit='10'
                                            headData={customerTableHead}
                                            renderHead={(item, index) => renderHead(item, index)}
                                            bodyData={users}
                                            renderBody={(item, index) => renderBody(item, index)}
                                        />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
