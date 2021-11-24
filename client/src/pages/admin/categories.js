import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Table from '../../components/admin/Table'
import { categoryAction } from '../../redux/actions/categoryActions'

const Categories = () => {
    const dispatch = useDispatch();
    const categoriesList = useSelector(state => state.categoriesList)
    const { loading, error, categories } = categoriesList

    useEffect(() => {
        dispatch(categoryAction())
    }, [dispatch])

    const tableHead = [
        'STT',
        'Thứ tự hiển thị',
        'Hình ảnh',
        'Tên',
        'Trạng thái',
        'Sửa',
        'Xóa',
    ]

    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{index}</td>
            <td>{item.displayOrder}</td>
            <td><img src={item.image} alt="ảnh" /></td>
            <td>{item.name}</td>
            <td>{item.status + ''}</td>
            <td><Link to={`/admin/categories/${item._id}`} ><i class='bx bxs-edit'></i></Link> </td>
            <td><Link to={`/admin/categories/${item._id}`} ><i class='bx bx-trash'></i></Link></td>
        </tr>
    )


    return (
        <div>
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">
                        Danh mục
                    </h2>
                </div>
                <div className="col-2">
                    <Link to='/admin/newCategory'>
                        <div className="slide__item">
                            <div className="sidebar__item-inner active flexcenter">
                                <span>Thêm mới</span>
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
                                loading ? <div>Loading...</div> : error ? <div>{error}</div>
                                    : categories.length === 0 ? <div>Không có danh mục nào</div> :
                                        <Table
                                            limit='10'
                                            headData={tableHead}
                                            renderHead={(item, index) => renderHead(item, index)}
                                            bodyData={categories}
                                            renderBody={(item, index) => renderBody(item, index)}
                                        />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories
