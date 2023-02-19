import { AuthGuard } from "../Auth"
import { useAxios } from "../hooks"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Input from "../components/form/Input"
import Button from "../components/form/Button"

export default function Product() {
    const axios = useAxios()
    const [products, setProducts] = useState([])
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: 0,
        stock: 0,
        catalog_id: 0
    })
    const [catalogs,setCatalogs] = useState([])
    const [showModal, setShowModal] = useState(false)

    let num = 1;

    useEffect(() => {
        fetchProducts()
    }, [])

    function fetchProducts() {
        axios.get('/products').then(res => {
            setProducts(res.data.products)
        })
        axios.get('/catalogs').then(res => {
            setCatalogs(res.data.catalogs)
        })
    }

    function handleDelete(id) {
        axios.delete('/products/' + id).then(res => {
            const deleteProducts = products.filter(product => product.id != id)
            setProducts(deleteProducts)
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleChange(e) {
        setNewProduct(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleClick(e) {
        e.preventDefault()
        axios.post('/products', newProduct).then(res => {
            fetchProducts()
            setShowModal(false)
            setNewProduct('')
        })
    }

    return (
        <AuthGuard>
            <div className="container pt-5">
                <button type="button" onClick={() => setShowModal(true)} className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#exampleModal" data-backdrop="false">
                    Create New Product
                </button>
                {showModal &&
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-la belledby="exampleModalLabel" aria-hidden="true" {...!showModal ? "style{{ display:none }}" : ''}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Create User</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form className="modal-body" onSubmit={handleClick}>
                                    <label>Product Name</label>
                                    <Input name="name" onChange={handleChange} />
                                    <label>Price</label>
                                    <Input name="price" onChange={handleChange} />
                                    <label>Stock</label>
                                    <Input name="stock" onChange={handleChange} />
                                    <label>Category</label>
                                    <br />
                                    <select name="catalog_id" onChange={handleChange} className="bg-white text-dark py-2 w-100">
                                        {catalogs.map(catalog => (
                                            <option key={catalog.id} value={catalog.id}>{catalog.name}</option>
                                        ))}
                                    </select>
                                    <div className="modal-footer">
                                        <Button type="sumbit" text="Create" data-bs-dismiss="modal" color="btn btn-success" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            return (
                                <tr key={product.id}>
                                    <th>{num++}</th>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td className="d-flex gap-1 justify-content-center">
                                        <Link className="btn btn-primary" to={`/products/${product.id}`}>Edit</Link>
                                        <button href="" className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </AuthGuard>
    )
}