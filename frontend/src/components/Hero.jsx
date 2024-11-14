import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='main-wrapper'>
            <div className="main">
                <div className="main-text">
                    <h1>MERN <span>Authentication</span></h1>
                    <p>
                        This is an MERN Authentication that stores a JWT in an HTTP only cookie. It also uses Redux Toolkit and the React RTK query for fetching backend Api.
                    </p>
                </div>

                <div className="main-btns">
                    <button>
                        <Link to='/login'  className='link' >Login</Link>
                    </button>

                    <button>
                        <Link to='/register' className='link' >Register</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero