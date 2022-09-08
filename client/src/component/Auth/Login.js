import React, {useRef} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Navigate, useNavigate} from 'react-router-dom'

function Login() {

  const email = useRef();
  const password = useRef();

  const navigate = useNavigate()

  const submitHandler = async (e)=>{
    e.preventDefault();
    const user ={
        email: email.current.value,
        password: password.current.value
    };
    try {
        await axios.post(`/api/v1/auth/login`, user).then(res=>{
            toast.success("User Login Successfull")
            localStorage.setItem('loginToken', true)
            navigate("/")
            window.location.reload()
        }).catch(err => toast.error(err.response.data.msg))
    }catch(error){
        toast.error(error.response.data.msg)
    }
   
   // console.log('data =', data)
  }
  return (
    <div className="container">
    <div className="row">
        <div className="col-md-12 text-center">
            <h3 className='display-3 text-secondary'>Login</h3>
        </div>
    </div>
    <div className="row">
        <div className="col-md-6 offset-md-3">
            <form onSubmit={submitHandler} autoComplete="off" >
                
                <div className="form-group mb-3">
                    <label htmlFor="email
                    " className="form-label">Email</label>
                    <input type="email" ref={email}  className="form-control" id="email" />
                </div>
                
                <div className="form-group mb-3">
                    <label htmlFor="address
                    "   className="form-label">Password</label>
                    <input ref={password} type="password" className="form-control" id="password"></input>
                </div>
                <div className="form-group text-center">
                    <input type="submit"  value="Login" className="btn btn-secondary "/>
                </div>
            </form>
        </div>
    </div> 
</div>
  )
}

export default Login