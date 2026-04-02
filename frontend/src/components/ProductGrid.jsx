import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, ChevronLeft, ChevronRight, Package } from 'lucide-react'
import ProductCard from './ProductCard'
import { getProducts } from '../utils/api'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'popular', label: 'Most Popular' },
]

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="skeleton h-52" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-4 w-4/5 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-6 w-1/2 rounded" />
        <div className="skeleton h-10 rounded-xl" />
      </div>
    </div>
  )
}

export default function ProductGrid({ activeCategory }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({})
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const urlCategory = searchParams.get('category') || ''

  const category = activeCategory || urlCategory

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = { page, limit: 10, sort }
      if (category) params.category = category
      if (search) params.search = search
      const res = await getProducts(params)
      setProducts(res.data.data)
      setPagination(res.data.pagination)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [page, sort, category, search])

  useEffect(() => {
    setPage(1)
  }, [category, search, sort])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handlePageChange = (newPage) => {
    setPage(newPage)
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display font-bold text-2xl text-gray-900">
            {category ? `${category}` : search ? `Results for "${search}"` : 'All Products'}
          </h2>
          {!loading && (
            <p className="text-gray-500 text-sm mt-1">
              {pagination.total?.toLocaleString()} products found
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <SlidersHorizontal size={18} className="text-gray-500" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm font-semibold border-2 border-gray-100 rounded-xl px-3 py-2 bg-white focus:border-saffron-400 focus:outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {Array(10).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </motion.div>
        ) : products.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <Package size={64} className="text-gray-200 mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-gray-400 mb-2">No products found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your filters or search terms</p>
          </motion.div>
        ) : (
          <motion.div
            key={`${category}-${search}-${page}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {products.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2 mt-10"
        >
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={!pagination.hasPrev}
            className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center disabled:opacity-40 hover:border-saffron-400 hover:text-saffron-600 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1)
            .reduce((acc, p, idx, arr) => {
              if (idx > 0 && arr[idx - 1] !== p - 1) acc.push('...')
              acc.push(p)
              return acc
            }, [])
            .map((item, i) =>
              item === '...' ? (
                <span key={`ellipsis-${i}`} className="px-2 text-gray-400">…</span>
              ) : (
                <button
                  key={item}
                  onClick={() => handlePageChange(item)}
                  className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all ${
                    page === item
                      ? 'bg-saffron-500 text-white shadow-md shadow-saffron-200'
                      : 'border-2 border-gray-200 hover:border-saffron-400 hover:text-saffron-600'
                  }`}
                >
                  {item}
                </button>
              )
            )}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={!pagination.hasNext}
            className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center disabled:opacity-40 hover:border-saffron-400 hover:text-saffron-600 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </motion.div>
      )}
    </section>
  )
}
