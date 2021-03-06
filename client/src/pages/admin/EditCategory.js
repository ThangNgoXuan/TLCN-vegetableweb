import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { updateCategoryAction, detailCategoryAction } from '../../redux/actions/categoryActions'
import { Link } from 'react-router-dom';


const EditCategory = ({ match, history }) => {

  const categoryId = match.params.id;

  const categoryDetail = useSelector(state => state.detailCategory)
  const { loading, error, category } = categoryDetail;

  const updateCategory = useSelector(state => state.updateCategory)
  const { loading: loadingUpdate, error: erorUpdate } = updateCategory;

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [displayOrder, setDisplayOrder] = useState('')
  const [status, setStatus] = useState(0)

  const dispatch = useDispatch()

  const myInfo = useSelector(state => state.userSignin);
  const { userInfo } = myInfo;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      if (!category || category._id !== categoryId) {
        dispatch(detailCategoryAction(categoryId))
      } else {
        setName(category.name)
        setImage(category.image)
        setDisplayOrder(category.displayOrder)
        setStatus(category.status)
      }
    } else {
      history.push('/login')
    }
  }, [dispatch, categoryId, category, history, userInfo])

  const handleUploadImage = (e) => {
    const cloundName = 'dl02ow13v';
    const uploadPreset = 'oj8a39rm';
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", uploadPreset);

    Axios.post(`https://api.cloudinary.com/v1_1/${cloundName}/upload`, formData)
      .then(res => {
        setImage(res.data.url)

      }).catch(error =>
        console.log(error)
      )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategoryAction({
      _id: category._id,
      name,
      status,
      displayOrder,
      image,
    }))
  }

  return (
    <div>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
      />
      <h2 className="page-header">Ch???nh s???a danh m???c</h2>
      <div className="row">
        <div className="col-10">
          <div className="card full-height">
            {loadingUpdate && <div>C???p nh???t...</div>}
            {erorUpdate && <div>{erorUpdate}</div>}
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <form action="" className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>T??n danh m???c</label>
                  <input
                    type="text"
                    placeholder="Rau c??? qu???"
                    className="userUpdateInput"
                    onChange={e => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Tr???ng th??i</label>
                  <select defaultValue={status} onChange={e => setStatus(e.target.value)}>
                    <option value='true'>Hi???n th???</option>
                    <option value='false' >???n ??i</option>
                  </select>
                </div>
                <div className="userUpdateItem">
                  <label>Th??? t??? hi???n th???</label>
                  <input
                    type="number"
                    placeholder="VD: 1"
                    className="userUpdateInput"
                    onChange={e => setDisplayOrder(e.target.value)}
                    value={displayOrder}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>H??nh ???nh</label>
                  <img src={image} alt="h??nh ???nh"
                    style={{ maxWidth: '200px' }}
                  />
                  <div>T???i h??nh ???nh t??? m??y t??nh</div>
                  <input type="file" id="file"
                    onChange={handleUploadImage}
                  />
                </div>
                <Link to="/admin/categories" className="userUpdateButton">Tr??? v???</Link>
                <button className="userUpdateButton">L??u</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCategory

