import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Helmet from '../components/Helmet'

import numberWithCommas from '../utils/numberWithCommas'
import { } from '../styles/order.css'
import axios from 'axios'
import { createOrder } from '../redux/actions/orderAction'

const Order = (props) => {

  const dispatch = useDispatch();
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [phone, setPhone] = useState('')
  const [mail, setMail] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  //const [onlinePayment, setOnlinePayment] = useState("");
  const [codPayment, setCodPayment] = useState("COD");

  //console.log(codPayment)
  //console.log(onlinePayment)


  let total = cartItems.reduce((a, c) => a + c.price * c.quantity, 0) + 30000;

  useEffect(() => {
    if (userInfo) {
      setFname(userInfo.firstName)
      setLname(userInfo.lastName)
      setPhone(userInfo.phone)
      setMail(userInfo.email)
    } else {
      props.history.push('/login?redirect=order');
    }
  }, [props.history, userInfo])

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (userInfo && cartItems.length > 0) {
      if (codPayment === "COD") {
        if (window.confirm('Xác nhận đặt hàng')) {
          await dispatch(
            createOrder({
              user: userInfo._id, totalPrice: total, shipAddress: address, paymentMethod: codPayment,
              paymentResult: false, mail, firstName: fname, lastName: lname,
              message: note, phone, orderItems: cartItems,
            })
          );

          await axios.post('/v1/order/sendmail', { userInfo, cartItems })
          localStorage.setItem("cartItems", '');
          props.history.push('/order-history');
        }
      }
    }
  }

  return (

    <Helmet title="Giỏ hàng">

      <form className="order" onSubmit={handleSubmitOrder}>
        <div className="order__info-shipping">
          <h4 className="order__info-title">Thông tin đặt hàng</h4>
          <div className="order__info-form">

            <div className="order__info-item-half">
              <div className="order__info-form-item half">
                <label className="order__info-input-label">Họ</label>
                <input className="order__info-input"
                  required
                  value={lname}
                  onChange={e => setLname(e.target.value)}
                />
              </div>

              <div className="order__info-form-item half">
                <label className="order__info-input-label">Tên</label>
                <input className="order__info-input"
                  required
                  value={fname}
                  onChange={e => setFname(e.target.value)}

                />
              </div>
            </div>
            <div className="order__info-item-half">
              <div className="order__info-form-item half">
                <label className="order__info-input-label">Số điện thoại</label>
                <input className="order__info-input"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}

                />
              </div>

              <div className="order__info-form-item half">
                <label className="order__info-input-label">Email</label>
                <input className="order__info-input"
                  required
                  value={mail}
                  onChange={e => setMail(e.target.value)}
                />
              </div>
            </div>
            <div className="order__info-item">
              <div className="order__info-form-item">
                <label className="order__info-input-label">Địa chỉ</label>
                <input className="order__info-input"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="order__info-item">
              <div className="order__info-form-item">
                <label className="order__info-input-label">Ghi chú</label>
                <textarea className="order__info-input"
                  onChange={e => setNote(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="order__list">
          <div className="order__list-title">Đơn hàng của bạn</div>
          <div className="order__list-sub-title">Sản phẩm</div>
          <ul className="order__list-product">
            {
              cartItems.map((item, index) => (
                <li key={index} className="order__list-product-item">

                  <span className="order__list-product-item-left">
                    <div className="order__list-product-name">{item.name}</div>
                    <div className="order__list-product-quantity">x{item.quantity}</div>
                  </span>
                  <div className="order__list-product-price">{numberWithCommas(item.price * item.quantity)}đ</div>

                </li>
              ))
            }

          </ul>
          <div className="order__shipping">
            <div className="order__shipping-title">Phí vận chuyển</div>
            <div className="order__shipping-fee">{numberWithCommas(30000)}đ</div>
          </div>
          <div className="order__price">
            <div className="order__price-title">Tổng tiền</div>
            <div className="order__price-total">{numberWithCommas(total)}đ</div>
          </div>
          <div className="order__payment">

            <div className="order__payment-item">
              <input checked={codPayment === 'COD'} type="radio" id="COD" name="pay" value="COD"
                // onChange={() => setCodPayment(codPayment !== 'COD' && 'COD')}
                onChange={() => setCodPayment('COD')}
              />
              <label for="COD">Thanh toán khi nhận hàng</label>
            </div>
            <div className="order__payment-item">
              <input checked={false} type="radio" id="online" name="pay" value="Online" />
              {/* onChange={() => setOnlinePayment(onlinePayment !== 'online' && 'online')} */}

              <label for="online">Thánh toán online(Chưa hỗ trợ)</label>
            </div>

            <div className="order__button">
              <button type="submit" className="order__button-checkout">Đặt hàng</button>
              <button className="order__button-return" onClick={() => props.history.push('/catalog')}>Tiếp tục mua hàng</button>
            </div>

          </div>
        </div>
      </form>

    </Helmet>
  )
}

export default Order
