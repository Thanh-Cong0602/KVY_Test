import Navbar from '@/components/Navbar'
import { Spin } from 'antd'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const ProductPage = lazy(() => import('@/pages/Product/ProductPage'))
const ShoppingCart = lazy(() => import('@/pages/ShoppingCart/ShoppingCart'))

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Spin />}>
        <Routes>
          <Route path='/' element={<ProductPage />} />
          <Route path='/shopping-cart' element={<ShoppingCart />} />
        </Routes>
      </Suspense>

      <ToastContainer newestOnTop={true} className='toast-position' position='top-center' />
    </>
  )
}

export default App
