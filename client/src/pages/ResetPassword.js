import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import { } from '../styles/login.css'
import { userLoginAction } from '../redux/actions/userAction'

const ResetPassword = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLoginAction({ email, password }));
  }


  const userSignin = useSelector(state => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }

  }, [props.history, redirect, userInfo]);

  return (
    <Helmet title="Đặt lại mật khẩu">
      <div className="login">
        <form onSubmit={handleSubmit} >
          <h3>Đặt lại mật khẩu</h3>
          <div className="input-group">
            <input type="email" placeholder="Địa chỉ email" required
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="far fa-envelope fa-2x i-login"></i>
          </div>
          <div className="input-group">
            <input type="password" placeholder="Mật khẩu" required
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fas fa-lock fa-2x i-login"></i>
          </div>
          <button className="btn btn-submit" type="submit">
            Đăng nhập</button>
          <div>  Quay lại trang<Link to="/login"> đăng nhập</Link></div>
        </form>
      </div>
    </Helmet>

  )
}

export default ResetPassword

