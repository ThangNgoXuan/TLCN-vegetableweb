import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import { updateCategoryAction, detailCategoryAction } from '../../redux/actions/categoryActions'


const EditCategory = ({ match, history }) => {

  const categoryId = match.params.id;

  const categoryDetail = useSelector(state => state.detailCategory)
  const { loading, error, category } = categoryDetail;

  const updateCategory = useSelector(state => state.updateCategory)
  const { loading: loadingUpdate, error: erorUpdate, success } = updateCategory;

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [path, setPath] = useState('')
  const [displayOrder, setDisplayOrder] = useState('')
  const [status, setStatus] = useState(0)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!category) {
      dispatch(detailCategoryAction(categoryId))
    } else {
      setName(category.name)
      setImage(category.image)
      setPath(category.path)
      setDisplayOrder(category.displayOrder)
      setStatus(category.status)
    }
  }, [dispatch, categoryId, category])

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
    dispatch(updateCategoryAction({
      _id: category._id,
      name,
      status,
      displayOrder,
      image,
      path,
    }))
  }

  return (
    <div>
      <h2 className="page-header">Chỉnh sửa danh mục</h2>
      <div className="row">
        <div className="col-10">
          <div className="card full-height">
            {loadingUpdate && <div>Cập nhật...</div>}
            {erorUpdate && <div>{erorUpdate}</div>}
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <form action="" className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Tên danh mục</label>
                  <input
                    type="text"
                    placeholder="Rau củ quả"
                    className="userUpdateInput"
                    onChange={e => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Trạng thái</label>
                  <select defaultValue={status} onChange={e => setStatus(e.target.value)}>
                    <option value='true'>Hiển thị</option>
                    <option value='false' >Ẩn đi</option>
                  </select>
                </div>
                <div className="userUpdateItem">
                  <label>Thứ tự hiển thị</label>
                  <input
                    type="number"
                    placeholder="VD: 1"
                    className="userUpdateInput"
                    onChange={e => setDisplayOrder(e.target.value)}
                    value={displayOrder}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Hình ảnh</label>
                  <img src={image} alt="hình ảnh" />
                  <input
                    type="text"
                    placeholder="Nhập url hình ảnh"
                    className="userUpdateInput"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                  />
                  <div>Tải hình ảnh từ máy tính</div>
                  <input type="file" id="file"
                    onChange={uploadFileHandler}
                  />
                  {uploading && <div>Loading...</div>}
                </div>
                <button className="userUpdateButton">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCategory

