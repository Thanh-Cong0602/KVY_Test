import CategoryFilter from '@/components/filter/CategoryFilter'
import RatingFilter from '@/components/filter/RatingFilter'
import SliderPrice from '@/components/filter/SliderPrice'
import { resetProduct, setClearFilter, setIsFilter } from '@/redux/feature/product.slice'
import { useAppDispatch } from '@/redux/hooks'
import '@/styles/filter.css'
import { Button, Flex } from 'antd'

const ProductFilter = () => {
  const dispatch = useAppDispatch()
  const handleClearFilter = () => {
    dispatch(resetProduct())
    dispatch(setClearFilter(true))
  }
  const handleFilter = () => {
    dispatch(setIsFilter(true))
  }
  return (
    <div className='filter__wrapper'>
      <div className='filter__categories'>
        <CategoryFilter />
        <SliderPrice />
        <RatingFilter />
        <Flex justify='end' gap='20px'>
          <Button type='dashed' danger onClick={handleClearFilter}>
            Clear
          </Button>
          <Button type='primary' danger onClick={handleFilter}>
            Filter
          </Button>
        </Flex>
      </div>
    </div>
  )
}

export default ProductFilter
