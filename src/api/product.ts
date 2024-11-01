import { ENDPOINTS } from '@/api/endpoint'
import API from '@/api/instance'

export const productApi = {
  getAllProducts() {
    return API.get(ENDPOINTS.PRODUCTS)
  },
  getProductById(productId: number) {
    return API.get(`${ENDPOINTS.PRODUCTS}/${productId}`)
  }
}
