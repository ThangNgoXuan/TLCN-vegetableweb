import React, { useCallback, useState, useEffect, useRef } from 'react'

import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'
import Header from '../components/Header'
import Footer from '../components/Footer'

import productData from '../fakedata/product'
import category from '../fakedata/category'
import protype from '../fakedata/product-type'
import certification from '../fakedata/product-certification'
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'

const Catalog = () => {

    const initFilter = {
        category: [],
        protype: [],
        certification: []
    }

    const productList = productData.getAllProducts()

    const [products, setProducts] = useState(productList)

    const [filter, setFilter] = useState(initFilter)

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch(type) {
                case "CATEGORY":
                    setFilter({...filter, category: [...filter.category, item.categorySlug]})
                    break
                case "PROTYPE":
                    setFilter({...filter, protype: [...filter.protype, item.protype]})
                    break
                case "CERTIFICATION":
                    setFilter({...filter, certification: [...filter.certification, item.certification]})
                    break
                default:
            }
        } else {
            switch(type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e => e !== item.categorySlug)
                    setFilter({...filter, category: newCategory})
                    break
                case "PROTYPE":
                    const newProtype = filter.protype.filter(e => e !== item.protype)
                    setFilter({...filter, protype: newProtype})
                    break
                case "CERTIFICATION":
                    const newCertification = filter.certification.filter(e => e !== item.certification)
                    setFilter({...filter, certification: newCertification})
                    break
                default:
            }
        }
    }

    const clearFilter = () => setFilter(initFilter)

    const updateProducts = useCallback(
        () => {
            let temp = productList

            if (filter.category.length > 0) {
                temp = temp.filter(e => filter.category.includes(e.categorySlug))
            }

            if (filter.protype.length > 0) {
                temp = temp.filter(e => {
                    const check = e.protype.find(protype => filter.protype.includes(protype))
                    return check !== undefined
                })
            }

            if (filter.certification.length > 0) {
                temp = temp.filter(e => {
                    const check = e.certification.find(certification => filter.certification.includes(certification))
                    return check !== undefined
                })
            }

            setProducts(temp)
        },
        [filter, productList],
    )

    useEffect(() => {
        updateProducts()
    }, [updateProducts])

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')

    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                category.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                            checked={filter.category.includes(item.categorySlug)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Chủng loại
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                protype.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("PROTYPE", input.checked, item)}
                                            checked={filter.protype.includes(item.protype)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Chứng nhận
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                certification.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("CERTIFICATION", input.checked, item)}
                                            checked={filter.certification.includes(item.certification)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>xóa bộ lọc</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>bộ lọc</Button>
                </div>
                <div className="catalog__content">
                    <InfinityList
                        data={products}
                    />
                </div>
            </div>
        </Helmet>
    )
}

export default Catalog
