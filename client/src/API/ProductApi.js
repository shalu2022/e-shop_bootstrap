import axios from 'axios'
import React, {useState, useEffect} from 'react'

function ProductApi() {
    const [products , setProducts] = useState([])

    // read products
    const getProducts = async()=>{
        const res = await axios.get(`/api/v1/product/getAll`)
        setProducts(res.data.products)
    }
    useEffect(()=>{
        getProducts()
    },[])

    return {
        products: [products, setProducts]
    }
}
export default ProductApi