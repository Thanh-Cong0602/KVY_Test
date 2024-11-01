import StarlentoMascot from '@/public/StarlentoMascot.png'
import AvatarUser from '@/public/vo_dien.jpg'
import { useAppSelector } from '@/redux/hooks'
import '@/styles/navbar.css'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Avatar, Badge, Flex, Image } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const cartItems = useAppSelector(state => state.product.items)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleCartClick = () => {
    navigate('/shopping-cart')
  }

  return (
    <div className='navbar__wrapper'>
      <Flex className='navbar__content' align='center' justify='space-between'>
        <Link to='/'>
          <Image src={StarlentoMascot} alt='Navbar Logo' width={60} height={60} preview={false} />
        </Link>
        <Flex gap='20px' align='center'>
          <Badge size='default' count={cartCount} showZero={false} onClick={handleCartClick}>
            <ShoppingCartOutlined
              style={{ fontSize: '30px', color: 'white', cursor: 'pointer' }}
            />
          </Badge>
          <Avatar src={AvatarUser} size={40}>
            USER
          </Avatar>
        </Flex>
      </Flex>
    </div>
  )
}

export default Navbar
