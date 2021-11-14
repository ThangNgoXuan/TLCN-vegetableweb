
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import Table from '../../components/admin/Table'

import { listProductsAdmin } from '../../redux/actions/productActions'

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
        <td><img src={item.images[0]} alt="Hình ảnh" /></td>
        <td>{item.name}</td>
        <td>{(item.category && item.category.name) || ''}</td>
        <td>{item.price}</td>
        <td>{0 + '%'}</td>
        <td>{item.qtyInStock}</td>
        <td>{item.sold}</td>
        <td>{item.brand}</td>
        <td>{item.description.substring(0, 32) + '...'}</td>
        <td>{'chưa lam'}</td>
        <td>{'chưa lam'}</td>
        <td>{'chưa lam'}</td>
        <td>{'chưa lam'}</td>
    </tr>
)

const Products = () => {

    const dispatch = useDispatch();
    const productsList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productsList


    const { pageNumber = 1 } = useParams()
    console.log('a')
    console.log(pageNumber)

    useEffect(() => {

        dispatch(listProductsAdmin({
            pageNumber
        }))
    }, [dispatch, pageNumber])

    return (
        <div>
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
