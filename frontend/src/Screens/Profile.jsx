import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateUserMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const Profile = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.auth)

    const [updateApi, { isLoading }] = useUpdateUserMutation()

    useEffect(() => {

        setName(userInfo.name)
        setEmail(userInfo.email)

    }, [userInfo.name, userInfo.email])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Password do not match")
        } else {
            try {
                const res = await updateApi({ _id: userInfo._id, name, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                toast.success("updated successfully")
                navigate('/login')
            } catch (err) {
                console.log(err)
                toast.error("something went wrong")
            }
        }

    }
    return (
        <div className="form-container">
            <form onSubmit={submitHandler}>
                <h1>Update Profile</h1>
                <div className="from-group">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Enter Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>

                <div className="from-group">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Enter Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div className="from-group">
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                <div className="from-group">
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                </div>

                <button type='submit' >
                    Update
                </button>

                <div className="check-user">
                    Already have an Account? <Link to='/login' className='link' >Login</Link>
                </div>

            </form>

        </div>
    )
}

export default Profile