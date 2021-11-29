import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addBrandAction } from '../../redux/actions/brandActions'

const NewBrand = ({ match, history }) => {

  const [name, setName] = useState('')
  const brandCreate = useSelector(state => state.addBrand);
  const { loading: loadingCreate, error: errorCreate, success: createdBrand } = brandCreate;

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBrandAction({ name }))
    console.log(createdBrand)
  }

  return (
    <div>
      <h2 className="page-header">Thêm thương hiệu mới</h2>
      <div className="row">
        <div className="col-10">
          <div className="card full-height">
            {loadingCreate && <div>Đang tạo...</div>}
            {errorCreate && <div>{errorCreate}</div>}
            {createdBrand && <div>Tạo thành công</div>}
            <form className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Tên thương hiệu</label>
                  <input
                    type="text"
                    placeholder="Dalat Farm"
                    className="userUpdateInput"
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <button className="userUpdateButton" type="submit">Thêm mới</button>
                <Link to="/admin/brands" className="userUpdateButton" >Trở về</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewBrand;

