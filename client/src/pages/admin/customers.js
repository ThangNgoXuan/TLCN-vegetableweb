import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { updateUserProfile } from '../../redux/actions/userAction'
import Table from '../../components/admin/Table'
import { listUserAction } from '../../redux/actions/userAction'

const Customers = () => {

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList;

    const dispatch = useDispatch();
    console.log(users)

    useEffect(() => {
        dispatch(listUserAction())
    }, [dispatch])

    const customerTableHead = [
        'STT',
        'Phân loại',
        'Avatar',
        'Tên',
        'Email',
        'SĐT',
        'Địa chỉ',
        'Trạng thái',
        'chỉnh sửa',
    ]

    const renderHead = (item, index) => <th key={index}>{item}</th>

    const handleChangeStatus = (status, id) => {
        dispatch(updateUserProfile({
            status: status,
            _id: id,
        }))
    }

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{index}</td>
            <td>{item.role}</td>
            <td><img src={item.avatar} alt='Hình ảnh' style={{ width: '30px' }} /></td>
            <td>{item.lastName + ' ' + item.firstName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.address}</td>
            <td>{item.status ? 'Hoạt động' : 'Đang khóa'}</td>
            <td>
                <select onChange={(e) => handleChangeStatus(e.target.value, item._id)}>
                    <option selected={item.status} value="false">Block</option>
                    <option selected={item.status} value="true">Active</option>
                </select>
            </td>
        </tr>
    )

    return (
        <div>
            <ToastContainer
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
            />
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
