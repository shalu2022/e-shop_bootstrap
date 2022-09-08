import React from 'react'
import { NavLink } from 'react-router-dom'

function Pnf() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-danger">Path Not Found</h3>
          <NavLink to={`/`} className="btn btn-outline-danger" >Return home</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Pnf