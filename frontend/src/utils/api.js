import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
})

const BACHAT_BAZAAR = "/bachat-bazaar";
const PRODCUT_ROUTES = BACHAT_BAZAAR + "/products";
const GET_PRODUCTS = PRODCUT_ROUTES + '/';
const GET_PRODUCTS_FEATURE = PRODCUT_ROUTES + '/featured';
const GET_PRODUCTS_CATEGORIES = PRODCUT_ROUTES + '/categories';

export const getProducts = (params) => api.get(GET_PRODUCTS, { params })
export const getFeaturedProducts = () => api.get(GET_PRODUCTS_FEATURE)
export const getProductBySlug = (slug) => api.get(`${PRODCUT_ROUTES}/${slug}`)
export const getRelatedProducts = (slug) => api.get(`${PRODCUT_ROUTES}/${slug}/related`)
export const getCategories = () => api.get(GET_PRODUCTS_CATEGORIES)

export default api
