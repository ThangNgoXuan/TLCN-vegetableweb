import React from 'react'


import user_image from '../../images/admin/avata.jpg'


const newProduct = () => {
  return (
    <div>
      <h2 className="page-header">Thêm sản phẩm mới</h2>
      <div className="row">
        <div className="col-10">
          <div className="card full-height">
            <form action="" className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Tên sản phẩm:(*)</label>
                  <input
                    type="text"
                    placeholder="VD: Cà phê rang xay..."
                    className="userUpdateInput"
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Giá:(*)</label>
                  <input
                    type="text"
                    placeholder="VD: 200000"
                    className="userUpdateInput"
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Giảm giá(%):(*)</label>
                  <input
                    type="text"
                    placeholder="VD: 30%"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Số lượng:(*)</label>
                  <input
                    type="text"
                    placeholder="20"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Thương hiệu:</label>
                  <input
                    type="text"
                    placeholder="Thang Ngo"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Trạng thái</label>
                  <input
                    type="text"
                    placeholder="Thang Ngo"
                    className="userUpdateInput"
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Mô tả</label>
                  <textarea
                    id="description"
                    rows="3"
                    type="text"
                    placeholder="Enter description"
                  ></textarea>
                </div>

                <div className="userUpdateUpload">
                  <label>Hình ảnh:</label>
                  <label htmlFor="file">
                    <i className="bx bx-upload bx-sm userUpdateIcon"></i>
                  </label>
                  <input type="file" id="file" multiple="multiple" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton">Create</button>
              </div>

              {/* <div className="userUpdateRight">
                
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default newProduct
