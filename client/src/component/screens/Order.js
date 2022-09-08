import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'


function Order() {
  const context = useContext(GlobalContext)
  const [token] = context.token
  const [orders, setOrders] = useState([])
  const [userData] = context.authApi.userData

  useEffect(()=>{
    const getOrders = async ()=>{
      let res = await axios.get(`/api/v1/auth/orders`,{
        headers :{ Authorization: token}   
      })
      setOrders(res.data.orders)
    }
    getOrders()
  },[])


  if(orders.length===0){
    return (
      <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-waring">Hi, {userData.name}, No Odrers</h3>
          <h5 className='text-secondary'>Happy Shopping.....</h5>
          <NavLink to={`/`}className="btn btn-success">Keep Shopping</NavLink>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-secondary">
            My Orders
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-2">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className='text-center'>
                <th>Order Id</th>
                <th>ADDRESS</th>
                <th>DATE</th>
                <th>Status</th>
                <th>Cart</th>
                <th>Total</th>
                <th>Payment Status</th>
              </tr>             
            </thead>
            <tbody>
              {
                orders && orders.map((item, index)=>{
                  return (
                    <tr className='text-center' key={index}>
                      <td>{item.orderId}</td>
                      <td>{item.address}</td>
                      <td>{new Date(item.createdAt).toLocaleString()}</td>
                      <td>{item.orderStatus}</td>
                      <td>
                        <details>
                          <summary>Show Cart</summary>
                          {
                           item.cart.map((item,index)=>{
                              return (
                                <div className="card mb-3" key={index}>
                                  <div className="row g-0">
                                    <div className="col-md-3 col-sm-4">
                                      <img src={item.image.url} alt="" className='img-fluid rounded-start' />
                                    </div>
                                    <div className="col-md-9 col-sm-8">
                                        <div className="card-body">
                                          <h5 className="card-title text-uppercase">{item.title}</h5>
                                        </div>
                                        <p> 
                                          <span className='float-start'>&#8377;{item.price}</span>
                                          <span className='float-center'>{item.qnty}</span>
                                          <span className='float-end'>Quantity = {item.quantity}</span>
                                        </p>
                                    </div>
                                  </div>
                                </div>
                              )
                          })
                        } 
                        </details>
                      </td>  
                        <td><strong className='text-success'>{item.finalTotal}</strong></td>  
                        <td>{item.paymentStatus}</td>                                  
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Order