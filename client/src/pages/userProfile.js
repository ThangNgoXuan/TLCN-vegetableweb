import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { detailsUser, updateUserProfile } from '../redux/actions/userAction';

const UserProfile = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');

  const myInfo = useSelector(state => state.userSignin);
  const { userInfo } = myInfo;
  const userDetail = useSelector(state => state.userDetail);
  const { loading, error, user } = userDetail;
  const dispatch = useDispatch()

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  useEffect(() => {

    if (!user) {
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
    }
  }, [dispatch, userInfo, user])

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Mật khẩu nhập lại không khớp');
    } else {
      dispatch(
        updateUserProfile({
          _id: user._id,
          name,
          email,
          password,
          address,
          phone,
        })
      );
    }
  }

  return (
    <div>
      <h2 className="page-header">Tài khoản của tôi</h2>
      <div className="row">
        <div className="col-4">
          <div className="card full-height">
            {
              loading ? <div>Loading...</div> : error ? <div>{error}</div>
                : <div>
                  <div className="userShowTop">
                    <img
                      src={(user && user.avatar) || ''}
                      alt=""
                      className="userShowImg"
                    />
                    <div className="userShowTopTitle">
                      <span className="userShowUsername">{(user && user.name) || ''}</span>
                      <span className="userShowUserTitle">Loại TK: {(user && user.role) || ''}</span>
                    </div>
                  </div>
                  <div className="userShowBottom">
                    <span className="userShowTitle">Thông tin tài khoảns</span>
                    <div className="userShowInfo">
                      <i className="bx bx-user bx-sm userUpdateIcon"></i>
                      <span className="userShowInfoTitle">{(user && user.name) || ''}</span>
                    </div>
                    <div className="userShowInfo">
                      <i className="bx bx-calendar-alt bx-sm userUpdateIcon"></i>
                      <span className="userShowInfoTitle">chưa làm</span>
                    </div>
                    <span className="userShowTitle">Thông tin liên hệ</span>
                    <div className="userShowInfo">
                      <i className="bx bx-phone bx-sm userUpdateIcon"></i>
                      <span className="userShowInfoTitle">{(user && user.phone) || ''}</span>
                    </div>
                    <div className="userShowInfo">
                      <i className="bx bx-mail-send bx-sm userUpdateIcon"></i>
                      <span className="userShowInfoTitle">{(user && user.email) || ''}</span>
                    </div>
                    <div className="userShowInfo">
                      <i className="bx bx-map bx-sm userUpdateIcon"></i>
                      <span className="userShowInfoTitle">{(user && user.address) || ''}</span>
                    </div>
                  </div>
                </div>
            }
          </div>
        </div>
        <div className="col-8">
          <div className="card full-height">
            <form action="" className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <span className="userShowTitle">Cập nhật thông tin</span>
                {loadingUpdate && <div>Đang cập nhật...</div>}
                {errorUpdate && <div>{errorUpdate}</div>}
                {successUpdate && <div>Cập nhật thành công</div>}
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Thang Ngo"
                    className="userUpdateInput"
                    value={user && user.name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    placeholder="+01 23456789"
                    className="userUpdateInput"
                    value={user && user.phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="mail@gmail.com"
                    className="userUpdateInput"
                    value={user && user.email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    placeholder="Địa chỉ"
                    className="userUpdateInput"
                    value={user && user.address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="userUpdateLeft">
                <span className="userShowTitle">Thay đổi mật khẩu</span>
                <div className="userUpdateItem">
                  <label>Nhập mật khẩu</label>
                  <input
                    type="password"
                    placeholder="password"
                    className="userUpdateInput"
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Xác thực mật khẩu</label>
                  <input
                    type="password"
                    placeholder="password"
                    className="userUpdateInput"
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>


              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={''}
                    alt=""
                  />
                  <label htmlFor="file">
                    <i className="bx bx-upload bx-sm userUpdateIcon"></i>
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton" type='submit'>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
