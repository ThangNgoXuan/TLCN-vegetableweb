import React from 'react'
import {} from '../styles/login.css'

const Register = () => {
    return (
        <div className="login">
          <form action="" >
              <h3>Đăng kí tài khoản</h3>
              <div className="input-group">
                  <label htmlFor="">Địa chỉ email</label>
                  <input type="text" />
                  <i class="far fa-envelope fa-2x"></i>
              </div>
              <div className="input-group">
                  <label htmlFor="">Số điện thoại</label>
                  <input type="text" />
              </div>
              <div className="input-group">
                  <label htmlFor="">Tên</label>
                  <input type="text" />
              </div>
              <div className="input-group">
                  <label htmlFor="">Họ và tên đệm</label>
                  <input type="text" />
              </div>
              <div className="input-group">
                  <label htmlFor="">Mật khẩu</label>
                  <input type="text" />
                  <i class="fas fa-lock fa-2x"></i>
              </div>
              <div className="input-group">
                  <label htmlFor="">Xác nhận mật khẩu</label>
                  <input type="text" />
                  <i class="fas fa-lock fa-2x"></i>
              </div>
              <button className="btn btn-submit">Đăng kí</button>
              <p>Bạn đã có tài khoản chưa? <a href="">Đăng nhập</a></p>
              <div className="rules">Tôi đồng ý với <a>Bảo mật</a> và <a>Điều khoản</a> hoạt động của chúng tôi.</div>
              <button className="btn btn-fb">Đăng nhập với facebook <i class="fab fa-facebook fa-2x"></i></button>
          </form>
        </div>
    )
}

export default Register
