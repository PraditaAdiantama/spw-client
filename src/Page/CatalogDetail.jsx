import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthGuard } from "../Auth";
import { useAxios } from "../hooks";
import Button from "../components/form/Button";
import Input from "../components/form/Input";

export default function ProductDetail() {
    const axios = useAxios()
    const params = useParams()

    const [products, setProducts] = useState([])
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: 0,
        stock: 0,
        catalog_id: 0
    })

    useEffect(() => {
        axios.get('/products/' + params.id).then(res => {
            setProducts(res.data.product)
        })
    }, [])

    function handleChange(e) {
        setProducts(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleClick() {
        axios.put('/products/' + params.id, products).then(res => {
            window.location.reload()
        })
    }

    return (
        <AuthGuard>
            <div className="container pt-5">
                <button type="button" className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Update Product
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Create User</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <label>Product Name</label>
                                <Input name="name" onChange={handleChange} value={products.name} />
                                <label>Price</label>
                                <Input name="price" onChange={handleChange} value={products.price} />
                                <label>Stock</label>
                                <Input name="stock" onChange={handleChange} value={products.stock} />
                                <label>Catalog</label>
                                <Input name="catalog_id" onChange={handleChange} />
                                <div className="modal-footer">
                                    <Button type="sumbit" onClick={handleClick} text="Create" data-bs-dismiss="modal" color="btn btn-success" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Catalog</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{products.name}</td>
                            <td>{products['catalog']?.name}</td>
                            <td>{products.price}</td>
                            <td>{products.stock}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AuthGuard>
    )
}