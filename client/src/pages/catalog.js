import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Helmet from '../components/Helmet'
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'
import Pagination from '../components/Pagination'

import { listProducts } from '../redux/actions/productActions'
import { categoryAction } from '../redux/actions/categoryActions'
import { Link, useParams } from 'react-router-dom'

const Catalog = () => {

    const {
        name = 'all',
        category = 'all',
        min = 0,
        max = 0,
        certification = 'all',
        pageNumber = 1,
    } = useParams();

    const dispatch = useDispatch();
    const productsList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productsList

    const categoriesList = useSelector(state => state.categoriesList)
    const { loading: loadingCategories, error: errorCategories, categories } = categoriesList

    const certificate = ['Hữu cơ', 'VietGAP', 'GlobalGAP']

    useEffect(() => {
        // updateProducts()
        dispatch(categoryAction())
        dispatch(listProducts({
            pageNumber,
            name: name !== 'all' ? name : '',
            category: category !== 'all' ? category : '',
            certification: certification !== 'all' ? certification : '',
            min,
            max,
        }))
    }, [dispatch, category, name, pageNumber, certification, min, max])

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || pageNumber;
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterCertificate = filter.certification || certification;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `catalog/category/${filterCategory}/name/${filterName}/certificate/${filterCertificate}/min/${filterMin}/max/${filterMax}/pageNumber/${filterPage}`;
    };

    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                loadingCategories ? <div>Loading...</div> : errorCategories ? <div></div>
                                    : !categories ? <div></div> :
                                        categories.map((item) => (
                                            <div key={item._id} className="catalog__filter__widget__content__item">
                                                <Link className={item._id === category ? 'active' : ''}
                                                    to={getFilterUrl({ category: item._id })}>
                                                    {item.name}
                                                </Link>
                                            </div>
                                        ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Chứng nhận
                        </div>
                        {!certificate ? <div></div> :
                            certificate.map(x =>
                                <div className="catalog__filter__widget__content">
                                    <div className="catalog__filter__widget__content__item">
                                        <Link className={certification === 'x' ? 'active' : ''}
                                            to={getFilterUrl({ certification: x })}>
                                            {x}</Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Khoảng Giá
                        </div>
                        <input placeholder="Từ" type="number"></input>
                        <input placeholder="Đến" type="number"></input>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" >Áp dụng</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>bộ lọc</Button>
                </div>
                <div className="catalog__content">
                    <InfinityList
                        products={products}
                        loading={loading}
                        error={error}
                        page={page}
                        pages={pages}
                    />
                </div>
            </div>
            <Pagination page={page} pages={pages} />
        </Helmet>
    )
}

export default Catalog
