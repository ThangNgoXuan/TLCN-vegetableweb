import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Table from '../../components/admin/Table'
import { categoryAction } from '../../redux/actions/categoryActions'

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
        <td>{item.image}</td>
        <td>{item.name}</td>
        <td>{item.status + ''}</td>
        <td>chưa có</td>
        <td>chưa có</td>
    </tr>
)

const Categories = () => {
    const dispatch = useDispatch();
    const categoriesList = useSelector(state => state.categoriesList)
    const { loading, error, categories } = categoriesList

    useEffect(() => {
        dispatch(categoryAction())
    }, [dispatch])

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
