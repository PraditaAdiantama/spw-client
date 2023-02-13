import './App.css'
import Login from './components/Page/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Page/Home'
import { AuthProvider } from './Auth'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
