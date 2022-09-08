import React, {useContext} from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import {GlobalContext} from "../../GlobalContext"
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import product from '../Product/product'

function Menu(props) {
    const context = useContext(GlobalContext)
    const [isLogged, setIsLogged] = context.authApi.isLogged;
    const [isAdmin, setIsAdmin] = context.authApi.isAdmin;
    const [isUser, setIsUser] = context.authApi.isUser;
    const [cart] = context.authApi.cart

    const navigate = useNavigate();

    const logoutUser = async ()=>{
      if(window.confirm('Are you sure to logout')){
        await axios.get(`/api/v1/auth/logout`)
        localStorage.clear();
        if(isAdmin){
            setIsAdmin(false);
        }
        if(isUser){
            setIsUser(false);
        }
        setIsLogged(false)
        toast.success('Successfully Logout');
        navigate(`/`);
      } else{
        toast.warning('Logout Terminated')
      }
    }

    //common route
    const commonRoute = ()=>{
        return (
            <ul className='navbar-nav' >
            <li className='nav-item dropdown'>
                <NavLink to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    Account
                </NavLink>
                <ul className='dropdown-menu'>
                    <li><NavLink to={`/profile`} className="dropdown-item">Profiles</NavLink></li>
                    <li>{
                        isUser ? <NavLink to={`/user/dashboard`} className="dropdown-item">User Dashboard</NavLink> : null
                        }
                        {
                        isAdmin ? <NavLink to={`/admin/dashboard`} className="dropdown-item">Admin Dashboard</NavLink> : null
                        }
                    </li>
                    <li>
                        {
                            isAdmin ? <NavLink to={`/admin/allOrders`}  className="dropdown-item">All Orders</NavLink> : 
                            <NavLink to={`/orders`} className="dropdown-item">Orders</NavLink>
                        }
                    </li>
                    <li className='dropdown-divider'></li>
                    <li>
                        <NavLink to={`/`} onClick={logoutUser} className="btn btn-outline-danger dropdown-item">Logout</NavLink>
                    </li> 
                </ul>
            </li>
            
                 {
                    isAdmin ? null : (
                        <li className='nav-item'>
                            <NavLink to={`/product/cart`} className="nav-link text-light">
                                <span className="text-light">{cart.length>0 ? cart.length : 0}</span>
                                <i className="bi bi-cart-fill"></i>
                            </NavLink>
                        </li>
                    )
                 }
           
            </ul >
        )
    }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-secondary ">
        <div className="container ">
            <NavLink to={`/`} className="navbar-brand">
                {
                    isAdmin ? "Admin" : "Food Order Project"
                }
            </NavLink>

            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
            <span className='navbar-toggler-icon'></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between" id="menu">
                    <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <NavLink to={`/`} className="nav-link">Home</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to={`/about`} className="nav-link">About</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to={`/contact`} className="nav-link">Contact</NavLink>
                    </li>
                </ul>
              
               {isLogged? commonRoute() : (
                 <ul className='navbar-nav'>
                 <li className='nav-item'>
                     <NavLink to={`/login`} className="nav-link">Login</NavLink>
                 </li>
                 <li className='nav-item'>
                     <NavLink to={`/register`} className="nav-link">Register</NavLink>
                 </li>
             </ul>
               )}
            </div>
        </div>
    </nav>
  )
}

export default Menu