import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

import Table from '../components/admin/Table'
import { myOrders as myOrdersAction } from '../redux/actions/orderAction'


const OrderHistory = ({ history }) => {

  const myOrders = useSelector(state => state.myOrders)
  const { loading, error, orders } = myOrders;
  const myInfo = useSelector(state => state.userSignin);
  const { userInfo } = myInfo;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(myOrdersAction())
    }
  }, [dispatch, userInfo, history])

  const customerTableHead = [
    'Mã đơn hàng',
    'Ngày mua',
    'Sản phẩm',
    'Tổng tiền',
    'Trạng thái',
    'Chi tiết'
  ]

  const renderHead = (item, index) => <th key={index}>{item}</th>

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item._id}</td>
      <td>{item.createdAt.substr(0, 10).split('-').reverse().join('/')}</td>
      <td>{item.orderItems[0].product.name}</td>
      <td>{item.totalPrice}</td>
      <td>{item.status}</td>
      <td><Link>Chi tiết</Link> </td>
    </tr>
  )

  return (
    <div>

      <div className="row">
        <div className="col-12">

          <div className="card">
            <h3>Đơn hàng của tôi</h3>
            <div className="card__body">
              {
                loading ? <div>Loading...</div> : error ? <div>{error}</div>
                  : orders && orders.length <= 0 ? <div>Không có đơn hàng nào</div> :
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

export default OrderHistory
