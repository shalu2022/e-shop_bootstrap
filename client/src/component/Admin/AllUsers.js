import axios from 'axios';
import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GlobalContext } from '../../GlobalContext'

function AllUsers() {
const data = useContext(GlobalContext)
const [products] = data.productApi.products;
const [allUsers] = data.authApi.allUsers
const [editableUser, setEditableUser] = useState(false)

const [isEdit, setIsEdit] = useState(false)

const toggleEdit = (userId) => {
  let user = allUsers.find(item=>item._id===userId)
  setEditableUser(user)
}

return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3">All Users</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr className='text-center'>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers && allUsers.map((item,index)=>{
                                return (
                                    <tr className='text-center' key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.role}
                                            <button onClick={()=> toggleEdit(item._id)} className="btn btn-sm btn-link"><i className='bi bi-pen-fill'></i></button>
                                        </td> 
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

export default AllUsers