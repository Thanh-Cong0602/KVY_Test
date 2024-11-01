import ShoppingCartTable from '@/components/ShoppingCartTable'
import '@/styles/cart.css'
import { Typography } from 'antd'

const { Title } = Typography
const ShoppingCart = () => {
  return (
    <div>
      <Title className='cart-title'>Shopping Cart</Title>
      <ShoppingCartTable />
    </div>
  )
}

export default ShoppingCart
