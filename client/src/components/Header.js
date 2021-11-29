import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, Route } from 'react-router-dom'
import { userLogOutAction } from '../redux/actions/userAction'

import logo from '../images/main-logo.png'

import Search from './Search'

const mainNav = [
    {
        display: "Trang chủ",
        path: "/"
    },
    {
        display: "Sản phẩm",
        path: "/catalog"
    },
    {
        display: "Giới thiệu",
        path: "/intro"
    },
    // {
    //     display: "Liên hệ",
    //     path: "/contact"
    // }
]

const Header = () => {

    const userSignin = useSelector(state => state.userSignin);
    const dispatch = useDispatch();
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { cartItems, error } = cart;

    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex(e => e.path === pathname)

    const headerRef = useRef(null)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        })
        return () => {
            window.removeEventListener("scroll")
        };
    }, []);

    const menuLeft = useRef(null)

    const menuToggle = () => menuLeft.current.classList.toggle('active')

    const signoutHandler = () => {
        dispatch(userLogOutAction());
    }

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo" style={{ height: '100%' }}>
                    <img src={logo} alt="#" style={{ width: '60px', borderRadius: '50%' }} />
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            {/* <i className="bx bx-search"></i> */}

                            <Route render={({ history }) => <Search history={history} />}></Route>
                        </div>

                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <span className="cart-icon-wrap">
                                    {cartItems ? cartItems.length > 0 ?
                                        <span className="cart-icon-amout">{cartItems.length}</span>
                                        : false : false
                                    }
                                    <i className="bx bx-shopping-bag"></i>
                                </span>
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            {!userInfo ?
                                <div style={{ fontSize: '14px' }}>
                                    <Link to="/login">Đăng nhập</Link>
                                    <Link>| Đăng ký</Link>
                                </div>
                                : <div className="user-wrap">
                                    <i className="bx bx-user"></i>
                                    <div className="dropdown">
                                        <ul>
                                            <li><Link to=""><span>Tài khoản của tôi</span></Link></li>
                                            <li><Link to="">Đơn mua</Link></li>
                                            <li><Link to="#signout" onClick={signoutHandler}
                                            >Đăng xuất
                                            </Link></li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
