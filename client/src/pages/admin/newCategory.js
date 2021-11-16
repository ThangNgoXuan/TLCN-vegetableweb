import React from 'react'


import user_image from '../../images/admin/avata.jpg'


const newCategory
  = () => {
    return (
      <div>
        <h2 className="page-header">New user</h2>
        <div className="row">
          <div className="col-10">
            <div className="card full-height">
              <form action="" className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Tên</label>
                    <input
                      type="text"
                      placeholder="Thang Ngo"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Trạng thái</label>
                    <select>
                      <option>Hiển thị</option>
                      <option>Ẩn đi</option>
                    </select>
                  </div>
                  <div className="userUpdateItem">
                    <label>Thứ tự hiển thị</label>
                    <input
                      type="number"
                      placeholder="VD: 1"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateUpload">
                    {/* <img
                      className="userUpdateImg"
                      src={user_image}
                      alt=""
                    />
                    <label htmlFor="file">
                      <i className="bx bx-upload bx-sm userUpdateIcon"></i>
                    </label> */}
                    <input type="file" id="file" />
                  </div>
                  <button className="userUpdateButton">Create</button>
                </div>
                {/* <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder="Thang Ngo"
                      className="userUpdateInput"
                    />
                  </div>
                </div> */}

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default newCategory

