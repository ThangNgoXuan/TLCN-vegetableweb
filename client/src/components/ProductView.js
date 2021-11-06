import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router'

import { addItem } from '../redux/cartItemsSlide'
import { remove } from '../redux/productModalSlice'

import Button from './Button'
import numberWithCommas from '../utils/numberWithCommas'

const ProductView = props => {

    const dispatch = useDispatch()

    let product = props.product

    if (product === undefined) {
        product = {
            title: "",
            price: '',
            image01: null,
            image02: null,
            categorySlug: "",
            protype: [],
            slug: "",
            certification: [],
            description: ""
        }
    }

    const [previewImg, setPreviewImg] = useState(product.images[0])

    const [descriptionExpand, setDescriptionExpand] = useState(false)

    const [protype, setProtype] = useState(undefined)

    const [certification, setCertification] = useState(undefined)

    const [quantity, setQuantity] = useState(1)

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    useEffect(() => {
        setPreviewImg(product.images[0])
        setQuantity(1)
        setProtype(undefined)
        setCertification(undefined)
    }, [product])

    const check = () => {
        if (protype === undefined) {
            alert('Vui lòng chọn màu sắc!')
            return false
        }

        if (certification === undefined) {
            alert('Vui lòng chọn kích cỡ!')
            return false
        }

        return true
    }

    const addToCart = () => {
        if (check()) {
            let newItem = {
                slug: product.slug,
                protype: protype,
                certification: certification,
                price: product.price,
                quantity: quantity
            }
            if (dispatch(addItem(newItem))) {
                alert('Đã thêm vào giở hàng')
            } else {
                alert('Thêm vào giỏ thất bại')
            }
        }
    }

    const goToCart = () => {
        if (check()) {
            let newItem = {
                slug: product.slug,
                protype: protype,
                certification: certification,
                price: product.price,
                quantity: quantity
            }
            if (dispatch(addItem(newItem))) {
                dispatch(remove())
                props.history.push('/cart')
            } else {
                alert('Fail')
            }
        }
    }

    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    <div className="product__images__list__item" onClick={() => setPreviewImg(product.images[0])}>
                        <img src={product.images[0]} alt="" />
                    </div>
                    <div className="product__images__list__item" onClick={() => setPreviewImg(product.images[1])}>
                        <img src={product.images[1]} alt="" />
                    </div>
                </div>
                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description__content" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {
                                descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{product.title}</h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {numberWithCommas(product.price)}
                    </span>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Số lượng
                    </div>
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="product__info__item">
                    <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
                    <Button onClick={() => goToCart()}>mua ngay</Button>
                </div>
            </div>
            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <div className="product-description__title">
                    Chi tiết sản phẩm
                </div>
                <div className="product-description__content" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                <div className="product-description__toggle">
                    <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                        {
                            descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object
}

export default withRouter(ProductView)
