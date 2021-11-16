import React, { useEffect, useState } from 'react'
import { } from '../styles/login.css'
import Helmet from '../components/Helmet'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { register } from '../redux/actions/userAction'

const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');


    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Mật khẩu bạn nhập lại không khớp!');
        } else {
            dispatch(register(name, email, password));
        }
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo])

    return (
        <Helmet title="Đăng ký tài khoản">
            <div className="login">
                <form action="" onSubmit={submitHandler}>
                    <h3>Đăng kí tài khoản</h3>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    <div className="input-group">
                        <label htmlFor="">Họ và tên</label>
                        <input type="text" placeholder="Nguyễn Văn A" required
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Địa chỉ email</label>
                        <input type="text" placeholder="nva@gmail.com" required
                            onChange={e => setEmail(e.target.value)}
                        />
                        <i class="far fa-envelope fa-2x"></i>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Mật khẩu</label>
                        <input type="password" required
                            onChange={e => setPassword(e.target.value)}
                        />
                        <i class="fas fa-lock fa-2x"></i>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Nhập lại mật khẩu</label>
                        <input type="password" required
                            onChange={e => setconfirmPassword(e.target.value)}
                        />
                        <i class="fas fa-lock fa-2x"></i>
                    </div>
                    <button className="btn btn-submit" type="submit">Đăng kí</button>
                    <p>Qay lại trang đăng nhập? <Link to="/login">Đăng nhập</Link></p>
                </form>
            </div>
        </Helmet>
    )
}

export default Register
