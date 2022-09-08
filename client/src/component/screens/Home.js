import React, {useContext} from 'react'
import { GlobalContext } from '../../GlobalContext'
import Product from '../Product/product'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Home() {
  const data = useContext(GlobalContext)
  const [products, setProducts] = data.productApi.products
  const [isUser] = data.authApi.isUser;
  const [isAdmin] = data.authApi.isAdmin;

  const [token] = data.token

  const navigate = useNavigate();

  const delHandler = async (id) => {
    if (window.confirm(`Are you sure to delete product?`)) {
        try {
            let product = await axios.get(`/api/v1/product/get/${id}`)
            if (!product) {
                toast.error('no product found')
            } else {
                // delete image
                axios.post(`/api/v1/image/product/destroy`, { public_id: product.public_id }, {
                    headers: { Authorization: token }
                })
                await axios.delete(`/api/v1/product/delete/${id}`, {
                    headers: { Authorization: token }
                })
                    .then(res => {
                        toast.success("Product deleted succssfully");
                        navigate("/products")
                        window.location.reload();
                        
                    }).catch(err => toast.error(err.message))
            }
        } catch (err) {
            toast.error(err.message)
        }
    } else {
        toast.warning('delete terminated')
    }
}

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-success">
            Products
          </h3>
        </div>
      </div>
      <div className="row">
        {
          products && products.map((item, index)=>{
            return (
                <Product key={index} {...item} isUser={isUser} isAdmin={isAdmin} del={delHandler} />
            )
          })
        }
      </div>
      <div className='row'>
         <img src="" alt="" />
      </div>
    </div>
  )
}

export default Home