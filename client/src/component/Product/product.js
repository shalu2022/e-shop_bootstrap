import React from 'react'
import { NavLink } from 'react-router-dom'
const noImage = "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"

function product(props) {

const {_id, title,category, price, image, desc, stock, qnty, rating, isAdmin, del} = props

  return (
    <React.Fragment>
        {
            stock === 0 ? null : (
                <div className="col-md-4 mt-2 mb-2 col-lg-3 col-sm-6">
                    <NavLink to={`/product/details/${_id}`} style={{textDecoration:"none"}} >
                    <div className="card position-relative">
                        <span className='position-absolute top-0 end-0 badge bg-warning rounded-pill'>
                        <i className='bi bi-star-fill'></i>{5}
                        </span>
                        {
                            image.url ? (
                                <img src={image.url} alt={title} className="card-img-top"/>
                            ) : (
                                <img src={noImage} alt="No image" className="card-img-top"/>
                            )
                        }
                        <div className="card-body">
                            <h6 className='text-center display-6'>{title}</h6>
                            <ul className='list-group'>
                                <li className='list-group-item'>
                                    <strong>Price</strong>
                                    <span className='float-end text-secondary'>&#8377; {price}</span>
                                </li>
                                <li className='list-group-item'>
                                    <strong>Category</strong>
                                    <span className='float-end text-secondary'>{category}</span>
                                </li>
                                <li className='list-group-item'>
                                    <span className='float-end text-secondary'>{desc}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-3 text-center">
                        {
                                            isAdmin ? (
                                                <>
                                                    <NavLink to={`/product/update/${_id}`} className="btn btn-sm btn-outline-info">
                                                        <i className="bi bi-pen"></i>
                                                    </NavLink>
                                                    <button onClick={() => del(_id)} className="btn btn-sm btn-outline-danger float-end">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </>
                                        ):
                                            null
                                    }
                        </div>
                    </div>
                    </NavLink>
                </div>
            )
        }
    </React.Fragment>
    
  )
}

export default product