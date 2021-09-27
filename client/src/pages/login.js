import React from 'react'
import Helmet from '../components/Helmet'
import {} from '../styles/login.css'

const Login = () => {
    return (
        <Helmet title="Đăng nhập">
 
            <div className="login">
            <form action="" >
                <h3>Đăng Nhập</h3>
                <div className="input-group">
                    <input type="text" placeholder="Địa chỉ email"/>
                    <i class="far fa-envelope fa-2x i-login"></i>
                </div>
                <div className="input-group">
                    <input type="text" placeholder="Mật khẩu" />
                    <i class="fas fa-lock fa-2x i-login"></i>
                </div>
                <button className="btn btn-submit">Đăng kí</button>
                <p>Quên mật khẩu ? <a href="">Nhấn vào đây</a></p>
                <p>Bạn chưa có tài khoản chưa?<a>Đăng kí</a> </p>
                <p>Hoặc</p>
                <button className="btn btn-fb">Đăng nhập với Facebook <i class="fab fa-facebook fa-2x"></i></button>
            </form>

        </div>
        </Helmet>

    )
}

export default Login
