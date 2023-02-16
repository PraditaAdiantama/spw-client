import './App.css'
import Login from './Page/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Page/Home'
import { AuthProvider } from './Auth'
import Product from './Page/Products'
import ProductDetail from './Page/ProductDetail'
import Employe from './Page/Employe'
import EmployeDetail from './Page/EmployeDetail'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/products' element={<Product />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/employes' element={<Employe />} />
            <Route path='/employes/:id' element={<EmployeDetail />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
