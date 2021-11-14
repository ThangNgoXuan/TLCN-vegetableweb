import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import user_image from '../../images/admin/avata.jpg'
import { detailsUser } from '../../redux/actions/userAction'

const Setting = () => {
    const myInfo = useSelector(state => state.userSignin);
    const { userInfo } = myInfo;
    const userDetail = useSelector(state => state.userDetail);
    const { loading, error, user } = userDetail;
    const dispatch = useDispatch()

    useEffect(() => {

        if (!user) {
            dispatch(detailsUser(userInfo._id));
        } else {
            // setName(user.name);
            // setEmail(user.email);
            // setIsSeller(user.isSeller);
            // setIsAdmin(user.isAdmin);
        }
    }, [dispatch, userInfo, user])

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
                        <form action="" className="userUpdateForm">
                            <div className="userUpdateLeft">
                                <span className="userShowTitle">Cập nhật thông tin</span>
                                <div className="userUpdateItem">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        placeholder="Thang Ngo"
                                        className="userUpdateInput"
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Số điện thoại</label>
                                    <input
                                        type="text"
                                        placeholder="+01 23456789"
                                        className="userUpdateInput"
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        placeholder="mail@gmail.com"
                                        className="userUpdateInput"
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Địa chỉ</label>
                                    <input
                                        type="text"
                                        placeholder="Địa chỉ"
                                        className="userUpdateInput"
                                    />
                                </div>
                            </div>
                            <div className="userUpdateLeft">
                                <span className="userShowTitle">Thay đổi mật khẩu</span>
                                <div className="userUpdateItem">
                                    <label>Nhập mật khẩu</label>
                                    <input
                                        type="text"
                                        placeholder="password"
                                        className="userUpdateInput"
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Xác thực mật khẩu</label>
                                    <input
                                        type="text"
                                        placeholder="password"
                                        className="userUpdateInput"
                                    />
                                </div>
                            </div>


                            <div className="userUpdateRight">
                                <div className="userUpdateUpload">
                                    <img
                                        className="userUpdateImg"
                                        src={user_image}
                                        alt=""
                                    />
                                    <label htmlFor="file">
                                        <i className="bx bx-upload bx-sm userUpdateIcon"></i>
                                    </label>
                                    <input type="file" id="file" style={{ display: "none" }} />
                                </div>
                                <button className="userUpdateButton">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting
