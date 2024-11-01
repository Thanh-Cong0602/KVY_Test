/* eslint-disable indent */

import { productApi } from '@/api/product'
import RatingComponent from '@/components/Rating'
import { addToCart, setClearFilter, setIsFilter } from '@/redux/feature/product.slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import '@/styles/product.css'
import { IProductRes, RatingType } from '@/types/product.type'
import { ProductCategory } from '@/utils/enum.utils'
import { ShoppingCartOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { Image, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ProductTable = () => {
  const dispatch = useAppDispatch()
  const [products, setProducts] = useState<IProductRes[]>([])
  const [filteredProducts, setFilteredProducts] = useState<IProductRes[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const filterState = useAppSelector(state => state.product)
  const { isFilter, category, rating, minPrice, maxPrice, clearFilter } = filterState

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const resData = await productApi.getAllProducts()
      const data: IProductRes[] = resData.data
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      toast.error('Please contact to Admin' + error, { autoClose: 2000 })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (isFilter) {
      const filtered = products.filter(product => {
        const matchesCategory = category ? product.category === category : true
        const matchesPrice =
          minPrice && maxPrice ? product.price >= minPrice && product.price <= maxPrice : true

        const matchesRating =
          rating !== undefined
            ? product.rating.rate >= rating && product.rating.rate < rating + 1
            : true

        return matchesCategory && matchesPrice && matchesRating
      })
      dispatch(setIsFilter(false))
      setFilteredProducts(filtered.length > 0 ? filtered : [])
    }

    if (clearFilter) {
      setFilteredProducts(products)
      dispatch(setClearFilter(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilter, products, category, rating, minPrice, maxPrice, clearFilter])

  const handleAddToCart = (id: number) => {
    dispatch(addToCart(id))
  }
  const columns: TableProps<IProductRes>['columns'] = [
    {
      title: 'Product image',
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
      title: 'Price',
      dataIndex: 'price',
      align: 'center',
      key: 'price',
      defaultSortOrder: 'descend',
      sorter: (x, y) => x.price - y.price
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
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (x, y) => x.rating.rate - y.rating.rate,
      render: (rating: RatingType) => <RatingComponent rating={rating} />
    },
    {
      title: 'Buy Order',
      dataIndex: 'id',
      key: 'cart',
      align: 'center',
      render: id => (
        <>
          <ShoppingCartOutlined
            style={{ fontSize: '30px', color: 'red', cursor: 'pointer' }}
            onClick={() => handleAddToCart(id)}
          />
        </>
      )
    }
  ]

  return (
    <div className='product__wrapper'>
      <Table<IProductRes>
        columns={columns}
        dataSource={filteredProducts.map(product => ({ ...product, key: product.id }))}
        loading={isLoading}
        bordered
        scroll={{ x: 800 }}
      />
    </div>
  )
}

export default ProductTable
