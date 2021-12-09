import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import numberWithCommas from '../utils/numberWithCommas'

import Table from '../components/admin/Table'
import { myOrders as myOrdersAction } from '../redux/actions/orderAction'


const OrderDetail = ({ history }) => {

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

      <div className="row">
        <div className="col-8">
          <div className="card">
            <h3>Đơn hàng của tôi</h3>
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
        <div className="col-4">
          <div className="card">
          <div className="order__shipping">
            <div className="order__shipping-title">Phí vận chuyển</div>
            <div className="order__shipping-fee">{numberWithCommas(30000)}đ</div>
          </div>
          <div className="order__price">
            <div className="order__price-title">Tổng tiền</div>
            <div className="order__price-total">300000đ</div>
          </div>
          <div className="order__payment">
            <div className="order__payment-item">
              <label for="COD">Thanh toán khi nhận hàng</label>
            </div>
            <div className="order__button">
              <button className="order__button-checkout">Trở về</button>
        
            </div>

          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
