import React, { useEffect } from 'react'
import { orderListAction } from '../../redux/actions/orderAction'
import Table from '../../components/admin/Table'
import numberWithCommas from '../../utils/numberWithCommas'

import { useDispatch, useSelector } from 'react-redux'
import { updateStatusOrderAction } from '../../redux/actions/orderAction'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = ({ history }) => {
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.orderList)
    const { loading, orders, error } = orderList;
    const myInfo = useSelector(state => state.userSignin);
    const { userInfo } = myInfo;

    useEffect(() => {
        if (userInfo && userInfo.role === 'admin') {
            dispatch(orderListAction())
        } else {
            history.push('/login')
        }

    }, [dispatch, userInfo, history])

    const customerTableHead = [
        'Mã đơn',
        'Người đặt',
        'email',
        'Số điện thoại',
        'Tổng tiền ',
        'Địa chỉ giao ',
        'Trạng thái'
    ]

    const handleChangeOrderState = (id, status) => {
        dispatch(updateStatusOrderAction({ status, id }))
    }

    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item._id}</td>
            <td>{item.lastName + ' ' + item.firstName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{numberWithCommas(item.totalPrice)}</td>
            {/* <td>{item.status}</td> */}
            <td>{item.shipAddress}</td>
            <td>
                <select onChange={(e) => handleChangeOrderState(item._id, e.target.value)}>
                    <option selected={item.status === "DANG_XU_LY"} value="DANG_XU_LY">Đang xử lý</option>
                    <option selected={item.status === "CHO_GIAO"} value="CHO_GIAO">Chờ giao hàng</option>
                    <option selected={item.status === "DANG_GIAO"} value="DANG_GIAO">Đang giao hàng</option>
                    <option selected={item.status === "DA_GIAO"} value="DA_GIAO">Đã giao hàng</option>
                    <option selected={item.status === "DA_HUY"} value="DA_HUY">Đã hủy</option>
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
                        Orders
                    </h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {loading ? <div>Loading...</div> : error ? <div>{error}</div> :
                                <Table
                                    limit='10'
                                    headData={customerTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={orders}
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

export default Orders
