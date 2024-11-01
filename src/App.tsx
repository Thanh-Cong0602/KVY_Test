import Navbar from '@/components/Navbar'
import ProductPage from '@/pages/Product/ProductPage'
import ShoppingCart from '@/pages/ShoppingCart/ShoppingCart'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProductPage />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />
      </Routes>
      <ToastContainer newestOnTop={true} className='toast-position' position='top-center' />
    </>
  )
}

export default App
