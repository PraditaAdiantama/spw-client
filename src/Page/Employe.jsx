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
    let num = 1;

    useEffect(() => {
        axios.get('/employes').then(res => {
            setProducts(res.data.employes[0])
        })
    }, [])


    console.log(products[0].username)
    async function handleDelete(id) {
        try {
            await axios.delete('/products/' + id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    function handleChange(e) {
        setNewProduct(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleClick(e) {
        e.preventDefault()
        axios.post('/products', newProduct).then(res => {
            window.location.reload()
        })
    }

    return (
        <AuthGuard>
            <div className="container pt-5">
                <button type="button" className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Create New Product
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <Input name="catalog_id" onChange={handleChange} />
                                <div className="modal-footer">
                                    <Button type="sumbit" text="Create" data-bs-dismiss="modal" color="btn btn-success" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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
                        <tr key={products.id}>
                            <td>{products.username}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AuthGuard>
    )
}