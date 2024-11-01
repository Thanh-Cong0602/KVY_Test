import SelectFilter from '@/components/filter/SelectFilter'
import { FilterCategory, ProductCategory } from '@/utils/enum.utils'
import { DefaultOptionType } from 'antd/es/select'

const CategoryFilter = () => {
  const options: DefaultOptionType[] = Object.values(ProductCategory).map(category => ({
    value: category as string,
    label: category as string
  }))

  return <SelectFilter type={FilterCategory.CATEGORY} options={options} />
}

export default CategoryFilter
