import { setCategory, setRating } from '@/redux/feature/product.slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { FilterCategory } from '@/utils/enum.utils'
import { Flex, Select } from 'antd'
import { DefaultOptionType } from 'antd/es/select'

interface SelectFilterProps {
  type: FilterCategory
  options: DefaultOptionType[]
}

const SelectFilter = ({ type, options }: Readonly<SelectFilterProps>) => {
  const dispatch = useAppDispatch()

  const category = useAppSelector(state => state.product.category)
  const rating = useAppSelector(state => state.product.rating)

  const onChange = (value: string) => {
    if (type === FilterCategory.CATEGORY) {
      dispatch(setCategory(value))
    } else if (type === FilterCategory.RATING) {
      dispatch(setRating(parseInt(value)))
    }
  }

  return (
    <Flex gap='10px' align='center'>
      <label className='filter_label'>{type}:</label>
      <Select
        style={{ width: '200px' }}
        showSearch
        placeholder={`Select a ${type}`}
        optionFilterProp='label'
        onChange={onChange}
        options={options}
        value={type === FilterCategory.CATEGORY ? category : rating?.toString()}
      />
    </Flex>
  )
}

export default SelectFilter
