import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import numberWithCommas from '../utils/numberWithCommas'

import Table from '../components/admin/Table'
import { orderDetail, payOrder } from '../redux/actions/orderAction'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET } from '../redux/constants/orderConstants'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OrderDetail = ({ history, match }) => {

  const orderId = match.params.id;

  const myInfo = useSelector(state => state.userSignin);
  const { userInfo } = myInfo;

  const oDetail = useSelector(state => state.orderDetail);
  const { order, loading, error } = oDetail;

  const [sdkReady, setSdkReady] = useState(false);
  const VND_To_USD = 23000;

  const dispatch = useDispatch();

  let isAdmin = (userInfo && userInfo.role === 'admin') ? true : false;
  let link = '/order-history';
  if (isAdmin) {
    link = '/admin/orders'
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      const addPayPalScript = async () => {
        const { data } = await axios.get('/v1/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      };

      if (!order || (order && (order.orderItems.length === 0 || order._id !== orderId))) {
        // alert('233') 
        dispatch({ type: ORDER_PAY_RESET });
        dispatch(orderDetail(orderId))
      }
      else if (order && !order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }

    }
  }, [dispatch, userInfo, history, orderId, sdkReady, order])

  const successPaymentHnadler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(order, paymentResult))
  };

  const customerTableHead = [
    'Hình ảnh',
    'Sản phẩm',
    'Giá',
    'Số Lượng',
    'Tạm tính',
  ]

  const trangthai = { 'DANG_XU_LY': 'Đang xử lý', 'CHO_GIAO': 'Chờ giao hàng', 'DANG_GIAO': 'Đang giao hàng', 'DA_GIAO': 'Đã giao hàng', 'DA_HUY': 'Đã hủy' }

  const renderHead = (item, index) => <th key={index}>{item}</th>

  const renderBody = (item, index) => (
    <tr key={index}>
      <td><img style={{ width: '80px' }}
        src={item.product && item.product.images && item.product.images[0]} alt=''></img></td>
      {/* <td>{item.createdAt.substr(0, 10).split('-').reverse().join('/')}</td> */}
      <td>{item.product && item.product.name}</td>
      <td>{item.price && numberWithCommas(item.price)}đ</td>
      <td>{item.quantity}</td>
      <td>{item.price && item.quantity && numberWithCommas(item.price * item.quantity)}đ</td>
    </tr>
  )
  //console.log(order)
  const fullAddress = (order) => {
    return order.detail + ', ' + order.ward + ', ' + order.district + ', ' + order.province
  }
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={true}
        newestOnTop={false}
      />

      <div className="row">
        <div className="col-8">
          <div className="card">
            <h3 style={{ marginBottom: "20px" }}>Chi tiết đơn hàng</h3>
            <p style={{ marginBottom: "4px" }}>Mã đơn hàng: #{order && order._id}</p>
            <p style={{ marginBottom: "10px" }}>Ngày đặt: {order && order.createdAt && order.createdAt.substr(0, 10).split('-').reverse().join('/')}</p>
            <div className="card__body">
              {
                loading ? <div>Loading...</div> : error ? <div>{error}</div>
                  : order && order.length <= 0 ? <div>Không có dữ liệu</div> :
                    <Table
                      limit='10'
                      headData={customerTableHead}
                      renderHead={(item, index) => renderHead(item, index)}
                      bodyData={order && order.orderItems}
                      renderBody={(item, index) => renderBody(item, index)}
                    />
              }
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="order__shipping">
              <div className="order__shipping-title">{order && (order.lastName + ' ' + order.firstName)}</div>
            </div>
            <div className="order__price">
              <div className="order__price-title">Địa chỉ: {order && order.address && fullAddress(order.address)}</div>
            </div>
            <div className="order__payment">
              <div className="order__payment-item">
                <label for="COD">SĐT: {order && order.phone}</label>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="order__shipping">
              <div className="order__shipping-title">Phí vận chuyển</div>
              <div className="order__shipping-fee">{numberWithCommas(30000)}đ</div>
            </div>
            <div className="order__price">
              <div className="order__price-title">Tổng tiền</div>
              <div className="order__price-total">{order && order.totalPrice && numberWithCommas(order.totalPrice)}đ</div>
            </div>
            <div className="order__payment">
              <div className="order__payment-item">
                <label for="COD">Trạng thái giao hàng: {order && trangthai[order.status]}</label>
              </div>
              <div className="order__payment-item">
                <label for="COD">Thanh toán: {order && order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</label>
                <br />
                <label for="COD">Thời gian: {order && order.paidAt ? order.paidAt : ''}</label>
              </div>
              <div className="order__payment-item">
                <label for="COD">Loại thanh toán: {order && order.paymentMethod}</label>
              </div>
              <div className="">

                {order && order.paymentMethod === 'Online' && !order.isPaid && (
                  <div>
                    <span style={{ color: 'red' }}>Xin mời quý khách thanh toán để hoàn tất đơn hàng</span>
                    <ul>
                      <li>
                        {!sdkReady ? (
                          <div>Loading...</div>
                        ) : (
                          <PayPalButton
                            amount={(order.totalPrice / VND_To_USD).toFixed(2)}
                            onSuccess={successPaymentHnadler}
                          ></PayPalButton>
                        )}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="order__button">
                <button className="order__button-checkout" onClick={() => { history.push(link) }}>Đơn hàng đã mua</button>
                <button className="order__button-checkout" onClick={() => { history.push('/catalog') }}>Tiếp tục mua hàng</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default OrderDetail
