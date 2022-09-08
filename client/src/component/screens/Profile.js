import React, {useContext, useState} from 'react'
import {GlobalContext} from '../../GlobalContext'

function Profile() {
const data = useContext(GlobalContext);
const [user] = data.authApi.userData;
const [isUser] = data.authApi.isUser;

const [isEdit, setIsEdit] = useState(false)

const toggleEdit = () => {
  setIsEdit(!isEdit)
}

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 test-center">
          <h5 className="display-5 text-success text-center">Profile Info</h5>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 col-sm-12 mb-2">
          <div className="card">
            <div className="card-body">
              {
                user.image ? (<img src={user.image.url} alt={user.image}className="card-img-top"/>) : (<h5 className='text-muted'>No image</h5>)
              }              
            </div>
          </div>
        </div>
      

      
      <div className="col-md-8 col-sm-12 mb-2">
        <div className="card">
          <div className="card-header">
            <h5 className='tex-center display-5 text-center'>{user.name}</h5>
          </div>
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Email</strong>
                <span className='text-secondary float-end'>{user.email}</span>
              </li>
              <li className="list-group-item">
                <strong>Mobile</strong>
                <span className='text-secondary float-end'>{user.mobile}</span>
              </li>
              <li className="list-group-item">
                <strong>Mobile</strong>
                <span className='text-secondary float-end'>{user.mobile}</span>
              </li>
              <li className="list-group-item">
                <strong>Role</strong>
                <span className='text-secondary float-end'>{user.role}</span>
              </li>
              {
                  isUser ? (<li className="list-group-item">                
                  <strong>Orders</strong>
                  <span className='text-secondary float-end'>{user.orders.length}</span>
                </li>) : null
                }
              
            </ul>
          </div>
      </div>
    </div>
    </div>

    </div>
  )
}

export default Profile