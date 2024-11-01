import { RatingType } from '@/types/product.type'

interface RatingComponentProps {
  rating: RatingType
}

const RatingComponent = ({ rating }: Readonly<RatingComponentProps>) => {
  return (
    <div>
      {`${rating.rate}/5`}
      <p>({rating.count} votes)</p>
    </div>
  )
}

export default RatingComponent
