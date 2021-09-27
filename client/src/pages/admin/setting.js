import React from 'react'

import user_image from '../../images/admin/avata.jpg'

const Setting = () => {
    return (
        <div>
           <h2 className="page-header">Setting</h2>
            <div className="row">
                <div className="col-4">
                    <div className="card full-height">
                        <div className="userShowTop">
                            <img
                                src={user_image}
                                alt=""
                                className="userShowImg"
                            />
                            <div className="userShowTopTitle">
                                <span className="userShowUsername">Thang Ngo</span>
                                <span className="userShowUserTitle">Admin</span>
                            </div>
                        </div>
                        <div className="userShowBottom">
                            <span className="userShowTitle">Thông tin tài khoảns</span>
                            <div className="userShowInfo">
                                <i className="bx bx-user bx-sm userUpdateIcon"></i>
                                <span className="userShowInfoTitle">Thang Ngo</span>
                            </div>
                            <div className="userShowInfo">
                                <i className="bx bx-calendar-alt bx-sm userUpdateIcon"></i>
                                <span className="userShowInfoTitle">02/02/2000</span>
                            </div>
                            <span className="userShowTitle">Thông tin liên hệ</span>
                            <div className="userShowInfo">
                                <i className="bx bx-phone bx-sm userUpdateIcon"></i>
                                <span className="userShowInfoTitle">0337930954</span>
                            </div>
                            <div className="userShowInfo">
                                <i className="bx bx-mail-send bx-sm userUpdateIcon"></i>
                                <span className="userShowInfoTitle">ngoxuathangnyc@gmail.com</span>
                            </div>
                            <div className="userShowInfo">
                                <i className="bx bx-map bx-sm userUpdateIcon"></i>
                                <span className="userShowInfoTitle">Dĩ An Bình Dương</span>
                            </div>
                        </div>
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
