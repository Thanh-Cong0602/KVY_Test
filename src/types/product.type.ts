export interface RatingType {
  rate: number
  count: number
}

export interface IProductRes {
  id: number
  title: string
  price: number
  category: string
  description: number
  image: string
  rating: RatingType
}

export interface CartItem {
  id: number
  quantity: number
}
