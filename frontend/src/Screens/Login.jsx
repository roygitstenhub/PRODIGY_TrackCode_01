import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoding }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {

    if (userInfo) {
      navigate('/')
    }

  }, [userInfo, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {

      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/')

    } catch (error) {
      console.log("invalid email or password")
      toast.error("invalid email or password")
    }
  }



  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
          <h1>Sign In</h1>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input type="email" placeholder='Enter Email' value={email} onChange={(e) => { SetEmail(e.target.value) }} />
        </div>

        <div className="form-group">
          <label htmlFor="">Password</label>
          <input type="password" placeholder='Enter Password' value={password} onChange={(e) => { SetPassword(e.target.value) }} />
        </div>

        <button type='submit' >
          Sign In
        </button>

        <div className="check-user">
          New User? <Link to='/register' className='link'>Register</Link>
        </div>

      </form>

    </div>
  )
}

export default Login