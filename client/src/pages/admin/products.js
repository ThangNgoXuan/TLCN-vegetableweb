
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import numberWithCommas from '../../utils/numberWithCommas'


import Table from '../../components/admin/Table'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listProductsAdmin, deleteProductAction } from '../../redux/actions/productActions'

const Products = ({ history }) => {

    const dispatch = useDispatch();
    const productsList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productsList
    const [pageNumber, setPageNUmber] = useState(1);
    const myInfo = useSelector(state => state.userSignin);
    const { userInfo } = myInfo;
    useEffect(() => {

        if (userInfo && userInfo.role === 'admin') {
            dispatch(listProductsAdmin({
                pageNumber
            }))
        } else {
            history.push('/login')
        }

    }, [dispatch, pageNumber, history, userInfo])

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa')) {
            dispatch(deleteProductAction(id, pageNumber));
        }
    }

    const handlePageChange = ({ newPage }) => {
        if (newPage) {
            setPageNUmber(newPage || page)
        }
    }

    const customerTableHead = [
        'STT',
        'Mã số',
        'Ảnh',
        'Tên',
        'Loại',
        'Giá',
        'Giảm giá(%)',
        'Trong kho',
        'Đã bán',
        'Thương hiệu',
        'Mô tả',
        'Ngày tạo',
        'Trạng thái',
        'Sửa',
        'Xóa'
    ]


    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{item._id}</td>
            <td><img src={item.images[0]} alt="Hình ảnh"
                style={{ maxWidth: '40px' }}
            /></td>
            <td>{item.name}</td>
            <td>{(item.category && item.category.name) || ''}</td>
            <td>{numberWithCommas(item.price)}</td>
            <td>{0 + '%'}</td>
            <td>{item.qtyInStock}</td>
            <td>{item.sold}</td>
            <td>{item.brand.name}</td>
            <td>{item.description.substring(0, 32) + '...'}</td>
            <td>{'chưa lam'}</td>
            <td>{item.status ? 'active' : 'disable'}</td>
            <td><Link to={`/admin/products/${item._id}`} ><i class='bx bxs-edit'></i></Link> </td>
            <td>
                <nav style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(item._id)}
                >
                    <i class='bx bx-trash'></i>
                </nav>
            </td>
        </tr>
    )

    return (
        <div>
            <ToastContainer
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
            />
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">
                        Danh sách sản phẩm
                    </h2>
                </div>
                <div className="col-2">
                    <Link to='/admin/newproduct'>
                        <div className="slide__item">
                            <div className="sidebar__item-inner active flexcenter">
                                <span>New Product</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                loading ? <div>Loading...</div> : error ? <div>{error.message}</div> :
                                    <Table
                                        limit='10'
                                        headData={customerTableHead}
                                        renderHead={(item, index) => renderHead(item, index)}
                                        bodyData={products}
                                        renderBody={(item, index) => renderBody(item, index)}
                                        page={page}
                                        pages={pages}
                                        handlePageChange={handlePageChange}
                                    />

                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products
