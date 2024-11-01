/* eslint-disable indent */

import { productApi } from '@/api/product'
import { removeCartItem, updateCartItemQuantity } from '@/redux/feature/product.slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { IProductRes } from '@/types/product.type'
import { ProductCategory } from '@/utils/enum.utils'
import {
  Button,
  Divider,
  Flex,
  Image,
  InputNumber,
  Table,
  TableProps,
  Tag,
  Typography
} from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const { Text } = Typography

const ShoppingCartTable = () => {
  const cartItems = useAppSelector(state => state.product.items)
  const dispatch = useAppDispatch()
  const [products, setProducts] = useState<IProductRes[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const productPromises = cartItems.map(item => productApi.getProductById(item.id))
      const productResponses = await Promise.all(productPromises)
      setProducts(productResponses.map(response => response.data))
    } catch (error) {
      toast.error('Please contact Admin: ' + error, { autoClose: 2000 })
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateCartItemQuantity({ id, quantity }))
  }

  const handleRemoveItem = (id: number) => {
    dispatch(removeCartItem(id))
    toast.success('Item removed from cart!', { autoClose: 2000 })
  }

  const columns: TableProps<IProductRes>['columns'] = [
    {
      title: 'Product Image',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      render: text => <Image src={text} width={40} height={40} alt='Product Image' />
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '60%',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: text => <a>{text}</a>
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      render: category => {
        let color
        switch (category) {
          case ProductCategory.JEWELERY:
            color = 'green'
            break
          case ProductCategory.ELECTRONICS:
            color = 'blue'
            break
          case ProductCategory.MEN:
            color = 'red'
            break
          default:
            color = 'orange'
        }
        return <Tag color={color}>{category}</Tag>
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'center',
      key: 'price',
      defaultSortOrder: 'descend',
      sorter: (x, y) => x.price - y.price
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      render: (_, record) => (
        <InputNumber
          min={1}
          value={cartItems.find(item => item.id === record.id)?.quantity || 1}
          onChange={quantity => handleQuantityChange(record.id, quantity as number)}
        />
      )
    },

    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: '10%',
      align: 'center',
      render: (_, record) => {
        const foundItem = cartItems.find(item => item.id === record.id)
        const quantity = foundItem ? foundItem.quantity : 0
        const totalPrice = record.price * quantity
        return totalPrice.toFixed(2)
      }
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Button type='link' danger onClick={() => handleRemoveItem(record.id)}>
          Delete
        </Button>
      )
    }
  ]

  const getTotalAmount = () => {
    return products.reduce((total, product) => {
      const foundItem = cartItems.find(item => item.id === product.id)
      const quantity = foundItem ? foundItem.quantity : 0
      return total + product.price * quantity
    }, 0)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems])

  if (cartItems.length === 0) {
    return (
      <div className='product__wrapper'>
        <Typography.Text>No items in the cart</Typography.Text>
      </div>
    )
  }

  return (
    <div className='product__wrapper'>
      <Table<IProductRes>
        columns={columns}
        dataSource={products.map(product => ({ ...product, key: product.id }))}
        loading={isLoading}
        bordered
        scroll={{ x: 800 }}
        pagination={false}
      />
      <Divider />
      <Flex gap='20px' justify='end'>
        <Text strong>Total Amount:</Text>
        <Text strong>${getTotalAmount().toFixed(2)}</Text>
      </Flex>
    </div>
  )
}

export default ShoppingCartTable
