import Navbar from '@/components/Navbar'
import ProductPage from '@/pages/Product/ProductPage'
import { Spin } from 'antd'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const ShoppingCart = lazy(() => import('@/pages/ShoppingCart/ShoppingCart'))

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProductPage />} />
        <Suspense fallback={<Spin />}>
          <Route path='/shopping-cart' element={<ShoppingCart />} />
        </Suspense>
      </Routes>
      <ToastContainer newestOnTop={true} className='toast-position' position='top-center' />
    </>
  )
}

export default App
