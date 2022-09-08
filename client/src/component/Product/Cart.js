import React,{useContext, useState, useEffect} from 'react'
import {GlobalContext} from "../../GlobalContext"
import {NavLink} from 'react-router-dom'
import axios from 'axios'


function Cart() {
  const data = useContext(GlobalContext)
  const [cart, setCart] = data.authApi.cart;
   const [token] = data.token
   const [finalTotal, setFinalTotal] =data.authApi.finalTotal;
   const orderUpdate = data.authApi.orderUpdate

  const [total, setTotal] = useState(0) // total price
  const [gst, setGst]= useState(5); //can be 5 ,12, 18, 26 // gst => cgst & sgst
  const [dc, setDC] = useState(30); //delivery charge
  const [order,setOrder] = data.authApi.order

  useEffect(()=>{
    const getTotal = () =>{
      const total = cart.reduce((prev, item)=>{
        return prev+ (item.price*item.quantity)
      },0)
      setTotal(total)
      let gstTotal  = Math.round(total*(5/100))
      let final = total + gstTotal+ dc; 
      setFinalTotal(final)

    }
    getTotal();
  },[cart])

  
  //inc count of items 
 
    const incCount = (id) =>{
      cart.forEach(item=>{
        if(item._id===id){
          item.quantity += 1
        }
      });
      setCart([...cart])
      updateCart(cart)
      //order update
      setOrder(cart,finalTotal)
      storeOrder(cart,finalTotal)
    }
  
  

  //to dec the count of items
  const decCount = (id) => {
      cart.forEach(item=>{
        if(item._id===id){
          item.quantity = 1 ? item.quantity = 1 : item.quantity -=1;
        }
      });
      setCart([...cart])
      updateCart(cart)
      //order update
      setOrder(cart,finalTotal)
      storeOrder(cart,finalTotal)
  }

  //update the cart
  const updateCart = async (cart) =>{
    await axios.patch(`/api/v1/auth/addToCart`, {cart},{
      headers: {Authorization: token}
    })
  }

  //delete from cart

  const delItem = (id) =>{
    if(window.confirm('Do you want to remove the product')){
      cart.forEach((item, index)=>{
        if(item._id===id) {
          cart.splice(index,1)
        }
      });
      setCart([...cart]);
      updateCart(cart)
    }
  }

  const storeOrder = async (cart,finalTotal) => {
    await orderUpdate(cart,finalTotal)
  }

  if(cart.length === 0){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="display-3 text-secondary">Cart is Empty</h3>
          </div>
      </div>
    </div>
    ) 
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className='display-3 text-secondary'>Cart</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-8 col-lg-8 mt-2">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Qnty</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {
                  cart && cart.map ((item, index)=>{
                    const {_id, title, image, price, qnty,quantity} = item
                    return (
                      <tr key={index}>
                        <td>{title}</td>
                        <td>
                          <img src={image.url} alt=""  className='img-fluid' style={{width:"100px"}}/>
                        </td>
                        <td>&#8377; {price}</td>
                        <td>{qnty}</td>
                        <td>
                          <span onClick={()=>decCount(_id)}  className='btn btn-sm btn-danger'>
                            <i className='bi bi-dash'></i>
                          </span>
                            <strong className='text-primary' fs-5>{quantity}</strong>
                            
                          <span onClick={()=>incCount(_id)} className='btn btn-sm btn-success'>
                            <i className='bi bi-plus'></i>
                          </span>
                        </td>
                        <td>
                        <span onClick={()=>delItem(_id)} className='btn btn-sm btn-danger'>
                            <i className='bi bi-trash'></i>
                        </span>
                        </td>
                        
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4 mt-2">
              <div className="card">
                <div className="card-header">
                  <h5>Cart Info</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Sub Total</strong>
                      <span className="text-secondary float-end">&#8377; {total}</span>
                    </li>
                    <li className='list-group-item'>
                      <strong>Gst (cgst+sgst)  %</strong>
                      <span className="text-secondary float-end">&#8377; {gst}</span>
                    </li>
                    <li className='list-group-item'>
                      <strong>Delivery Charges</strong>
                      <span className="text-secondary float-end">&#8377; {dc}</span>
                    </li>
                    <hr />
                    <li className='list-group-item'>
                      <strong>Final Total</strong>
                      <span className="text-secondary float-end">&#8377; {finalTotal}</span>
                    </li>
                  </ul>
                </div>
                <div className="card-footer d-grid">
                  <NavLink to={`/checkout`} className="btn btn-outline-success">Continue to Checkout</NavLink>
                </div>
              </div>
            </div>
        </div>
      </div>

  )
}

export default Cart