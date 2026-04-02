import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
})

export const getProducts = (params) => api.get('/products', { params })
export const getFeaturedProducts = () => api.get('/products/featured')
export const getProductBySlug = (slug) => api.get(`/products/${slug}`)
export const getRelatedProducts = (slug) => api.get(`/products/${slug}/related`)
export const getCategories = () => api.get('/categories')

export default api
