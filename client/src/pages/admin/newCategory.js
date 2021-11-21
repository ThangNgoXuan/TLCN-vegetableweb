import React, { useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'

const NewCategory = ({ match, history }) => {

  const categoryId = match.params.id;

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [path, setPath] = useState('')
  const [displayOrder, setDisplayOrder] = useState('')
  const [status, setStatus] = useState(0)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await Axios.post('/v1/upload/category', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <div>
      <h2 className="page-header">New user</h2>
      <div className="row">
        <div className="col-10">
          <div className="card full-height">
            <form action="" className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Tên</label>
                  <input
                    type="text"
                    placeholder="Rau củ quả"
                    className="userUpdateInput"
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Trạng thái</label>
                  <select onChange={e => setStatus(e.target.value)}>
                    <option value='true'>Hiển thị</option>
                    <option value='false'>Ẩn đi</option>
                  </select>
                </div>
                <div className="userUpdateItem">
                  <label>Thứ tự hiển thị</label>
                  <input
                    type="number"
                    placeholder="VD: 1"
                    className="userUpdateInput"
                    onChange={e => setDisplayOrder(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Hình ảnh</label>
                  <input
                    type="text"
                    placeholder="Nhập url hình ảnh"
                    className="userUpdateInput"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                  />
                  <input type="file" id="file"
                    onChange={uploadFileHandler}
                  />
                  {uploading && <div>Loading...</div>}
                </div>
                <button className="userUpdateButton">Tạo</button>
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

export default NewCategory

