import React from 'react'
import { } from '../styles/login.css'
import Helmet from '../components/Helmet'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <Helmet title="Đăng nhập">
            <div className="login">
                <form action="" >
                    <h3>Đăng kí tài khoản</h3>
                    <div className="input-group">
                        <label htmlFor="">Tên</label>
                        <input type="text" />
                    </div>
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
                        <label htmlFor="">Mật khẩu</label>
                        <input type="text" />
                        <i class="fas fa-lock fa-2x"></i>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Nhập lại mật khẩu</label>
                        <input type="text" />
                        <i class="fas fa-lock fa-2x"></i>
                    </div>
                    <button className="btn btn-submit">Đăng kí</button>
                    <p>Bạn đã có tài khoản chưa? <Link to="/login">Đăng nhập</Link></p>
                    <div className="rules">Tôi đồng ý với <Link>Bảo mật</Link> và <Link to="">Điều khoản</Link> hoạt động của chúng tôi.</div>
                    <button className="btn btn-fb">Đăng nhập với Google <i class="fab fa-facebook fa-2x"></i></button>
                </form>
            </div>
        </Helmet>
    )
}

export default Register
