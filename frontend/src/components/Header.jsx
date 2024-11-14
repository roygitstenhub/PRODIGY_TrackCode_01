import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { BiUser } from "react-icons/bi";

const Header = () => {

    const [logoutApi] = useLogoutMutation()


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { userInfo } = useSelector((state) => state.auth)

    const handleLogout = async() => {
        try {
            await logoutApi().unwrap()
            dispatch(logout())
            navigate('/login')
        } catch (err) {
            console.error(err)
        }
    }

    return (

        <nav>
            <h2>mernAuth</h2>
            {
                userInfo ? (
                    <>
                        <div className="nav-links">
                            <Link className='nav-item' to='/profile'>{userInfo.name}</Link>
                            <Link className='nav-item' to='' onClick={handleLogout}>logout</Link>
                        </div >
                    </>
                ) : (
                    <>
                        <div className="nav-links">
                            <Link className='nav-item' to='/login'>Sign in <BiUser /></Link>
                            <Link className='nav-item' to='/register'>Sign up <BiUser/></Link>
                        </div >

                    </>
                )
            }
        </nav >
    )
}

export default Header


