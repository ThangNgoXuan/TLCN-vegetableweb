import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';

import { addSlideAction } from '../../redux/actions/slideAction'
import { Link } from 'react-router-dom';
import Table from '../../components/admin/Table'
import { myOrders as myOrdersAction } from '../../redux/actions/orderAction';


const OrderDetail = ({ history }) => {

    const myOrders = useSelector(state => state.myOrders)
    const { loading, error, orders } = myOrders;
    const myInfo = useSelector(state => state.userSignin);
    const { userInfo } = myInfo;
  
    const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {

    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const customerTableHead = [
    'Mã sản phẩm',
    'Tên sản phẩm',
    'Hình ảnh',
    'Số Lượng',
    'Giá',
  ]

  const renderHead = (item, index) => <th key={index}>{item}</th>

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item._id}</td>
      <td>{item.createdAt.substr(0, 10).split('-').reverse().join('/')}</td>
      <td>{item.orderItems[0].product.name}</td>
      <td>{item.totalPrice}</td>
      <td>{item.status}</td>
    </tr>
  )

  return (
    <div>
      <h2 className="page-header">Chi tiết đơn hàng</h2>
      <div className="row">
        <div className="col-10">
          <div className="card full-height">
          <div className="card__body">
              {
                loading ? <div>Loading...</div> : error ? <div>{error}</div>
                  : orders && orders.length <= 0 ? <div>Không có sản phẩm nào</div> :
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

export default OrderDetail;

