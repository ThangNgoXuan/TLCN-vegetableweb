import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import Dropdown from './Dropdown'

import { useSelector } from 'react-redux'



// const renderNotificationItem = (item, index) => (
//     <div className="notification-item" key={index}>
//         <i className={item.icon}></i>
//         <span>{item.content}</span>
//     </div>
// )

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.avatar} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.lastName}
        </div>
    </div>
)

const renderUserMenu = (item, index) => (
    <Link to='/' key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const Topnav = ({ history }) => {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;


    // useEffect(() => {
    //     if (userInfo && userInfo.role === 'admin') {

    //     } else {
    //         history.push('/login')
    //     }
    // })



    const user_menu = [
        {
            "icon": "bx bx-user",
            "content": "Tài khoản"
        },
        {
            "icon": "bx bx-log-out-circle bx-rotate-180",
            "content": "Đăng xuất"
        }
    ]

    return (
        <div className='topnav'>
            <div className="topnav__search">
                <input type="text" placeholder='Search here...' />
                <i className='bx bx-search'></i>
            </div>
            <div className="topnav__right">
                {
                    userInfo && userInfo.role === 'admin' ?
                        <div className="topnav__right-item">
                            <Dropdown
                                customToggle={() => renderUserToggle(userInfo)}
                                contentData={user_menu}
                                renderItems={(item, index) => renderUserMenu(item, index)}
                            />
                        </div> : ''
                }

                {/* <div className="topnav__right-item">
                    <Dropdown
                        icon='bx bx-bell'
                        badge='12'
                        contentData={notifications}
                        renderItems={(item, index) => renderNotificationItem(item, index)}
                        renderFooter={() => <Link to='/'>View All</Link>}
                    />
                </div> */}
            </div>
        </div>
    )
}

export default Topnav
