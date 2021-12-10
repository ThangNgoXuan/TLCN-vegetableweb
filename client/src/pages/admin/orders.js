import React, { useEffect, useState } from 'react'
import { orderListAction } from '../../redux/actions/orderAction'
import Table from '../../components/admin/Table'
import numberWithCommas from '../../utils/numberWithCommas'

import { useDispatch, useSelector } from 'react-redux'
import { updateStatusOrderAction } from '../../redux/actions/orderAction'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import SearchAdmin from '../../components/admin/SearchAdmin'


const Orders = ({ history }) => {
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.orderList)
    const { loading, orders, error, page, pages } = orderList;
    const myInfo = useSelector(state => state.userSignin);
    const { userInfo } = myInfo;

    const [pageNumber, setPageNUmber] = useState(1);

    useEffect(() => {
        if (userInfo && userInfo.role === 'admin') {
            dispatch(orderListAction({}))
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
        'Chi tiết',
        'Trạng thái'
    ]

    const handleChangeOrderState = (id, status) => {
        dispatch(updateStatusOrderAction({ status, id }))
    }

    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item._id}</td>
            <td style={{ minWidth: '180px' }}>{item.lastName + ' ' + item.firstName}</td>
            <td>{item.mail}</td>
            <td>{item.phone}</td>
            <td>{numberWithCommas(item.totalPrice)}</td>
            {/* <td>{item.status}</td> */}
            <td>{item.shipAddress}</td>
            <td><Link to={"/order-detail/" + item._id}><p>Chi tiết</p></Link></td>
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

    const handleSearchData = (text) => {
        if (text !== '') {
            dispatch(orderListAction({ pageNumber: 1 || pageNumber, keyword: text }));
        }
    }

    const handlePageChange = ({ newPage }) => {
        if (newPage) {
            setPageNUmber(newPage || page)
            dispatch(orderListAction({ pageNumber: newPage || page }))

        }
    }

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
                <div className="col-2">
                    <h2 className="page-header">
                        <SearchAdmin handleSearchData={handleSearchData} />
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
                                    bodyData={orders && orders}
                                    renderBody={(item, index) => renderBody(item, index)}
                                    page={page}
                                    pages={pages}
                                    handlePageChange={handlePageChange}
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
