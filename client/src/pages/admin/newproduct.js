import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { categoryAction } from '../../redux/actions/categoryActions';
import { listBrandAction } from '../../redux/actions/brandActions';
import { addProductAction } from '../../redux/actions/productActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const NewProduct = ({ history }) => {

  const myInfo = useSelector(state => state.userSignin);
  const { userInfo } = myInfo;
  const listCategory = useSelector(state => state.categoriesList);
  const { categories } = listCategory;
  const brandsList = useSelector(state => state.brandsList);
  const { loading: loadingBrands, error: errorBrands, brands } = brandsList;

  const [name, setName] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [brand, setbrand] = useState('619e43058b9769d52dd8e171');
  const [category, setCategory] = useState('618dde0eb74f7288232092b9');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [qtyInStock, setQtyInStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [certification, setCertification] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      if (brands && brands.length === 0) {
        dispatch(listBrandAction());
      }
      if (categories && categories.length === 0) {
        dispatch(categoryAction());
      }
    } else {
      history.push('/login')
    }

  }, [history, userInfo, dispatch, brands, categories])

  const handleUploadImage = (e) => {
    const cloundName = 'dl02ow13v';
    const uploadPreset = 'oj8a39rm';
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", uploadPreset);

    axios.post(`https://api.cloudinary.com/v1_1/${cloundName}/upload`, formData)
      .then(res => {
        if (image1 === '') {
          setImage1(res.data.url)
        } else {
          setImage2(res.data.url)
        }

      }).catch(error =>
        console.log(error)
      )
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(addProductAction({
      name,
      brand,
      category,
      description,
      price,
      qtyInStock,
      discount,
      certification,
      creator: userInfo._id,
      images: [image1, image2],
    }))

  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2400}
        hideProgressBar={true}
        newestOnTop={false}
      />
      <h2 className="page-header">Th??m s???n ph???m m???i</h2>
      <div className="row">
        <div className="col-10">
          <div className="card full-height">
            <form action="" className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>T??n s???n ph???m:(*)</label>
                  <input
                    type="text"
                    placeholder="VD: C?? ph?? rang xay..."
                    className="userUpdateInput"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Gi??:(*)</label>
                  <input
                    type="text"
                    placeholder="VD: 200000"
                    className="userUpdateInput"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Gi???m gi??(%):(*)</label>
                  <input
                    type="text"
                    placeholder="VD: 30%"
                    className="userUpdateInput"
                    onChange={(e) => setDiscount(e.target.value)}
                    required
                  />
                </div>
                <div className="userUpdateItem">
                  <label>S??? l?????ng:(*)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="20"
                    className="userUpdateInput"
                    onChange={(e) => setQtyInStock(e.target.value)}
                    required
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Danh m???c:</label>

                  <select onChange={e => setCategory(e.target.value)} required>
                    {
                      categories &&
                      categories.map((item, index) =>
                        <option key={index} value={item._id}>{item.name}</option>
                      )
                    }
                  </select>
                </div>
                <div className="userUpdateItem">
                  <label>Th????ng hi???u:</label>

                  <select onChange={e => setbrand(e.target.value)} >
                    {loadingBrands ? '' : errorBrands ? '' :
                      brands &&
                      brands.map((item, index) =>
                        <option key={index} value={item._id}>{item.name}</option>
                      )
                    }
                  </select>
                </div>
                <div className="userUpdateItem">
                  <label>Ch???ng nh???n:</label>
                  <input
                    type="text"
                    placeholder="VD: VietGAP"
                    className="userUpdateInput"
                    onChange={(e) => setCertification(e.target.value)}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>M?? t???</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data="<p>Nh???p m?? t??? cho s???n ph???m</p>"
                    onChange={(event, editor) => {
                      setDescription(editor.getData())
                    }}
                  />
                </div>
                <div className="userUpdateUpload">
                  <label>H??nh ???nh:</label>
                  <input placeholder="Nh???p url h??nh ???nh"
                    onChange={(e) => setImage1(e.target.value)}
                    value={image1}
                    required
                    className='userUpdateInput'
                  ></input>
                  <span>Ho???c t???i l??n</span>
                  <label htmlFor="file">
                    <i className="bx bx-upload bx-sm userUpdateIcon"></i>
                  </label>
                  <input onChange={handleUploadImage} type="file" id="file" multiple="multiple" style={{ display: "none" }} />
                </div>
                <div className="userUpdateUpload">
                  <label>H??nh ???nh:</label>
                  <input placeholder="Nh???p url h??nh ???nh"
                    onChange={(e) => setImage2(e.target.value)}
                    value={image2}
                    className='userUpdateInput'
                  ></input>
                  <span>Ho???c t???i l??n</span>
                  <label htmlFor="file">
                    <i className="bx bx-upload bx-sm userUpdateIcon"></i>
                  </label>
                  <input onChange={handleUploadImage} type="file" id="file" multiple="multiple" style={{ display: "none" }} />
                </div>
                <span style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <button style={{ width: '30%' }} className="userUpdateButton"
                    onClick={() => { history.push('/admin/products') }}
                  >Tr??? v???</button>
                  <button style={{ width: '30%' }} type="submit" className="userUpdateButton">T???o m???i</button>
                </span>
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

export default NewProduct
