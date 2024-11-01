import SelectFilter from '@/components/filter/SelectFilter'
import { FilterCategory } from '@/utils/enum.utils'
import { DefaultOptionType } from 'antd/es/select'

const ratings: DefaultOptionType[] = Array.from({ length: 5 }, (_, index) => ({
  value: index.toString(),
  label: index.toString()
}))

const RatingFilter = () => {
  return <SelectFilter type={FilterCategory.RATING} options={ratings} />
}

export default RatingFilter
