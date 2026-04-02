import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Flame, Star, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { getFeaturedProducts } from '../utils/api'
import useCartStore from '../store/cartStore'
import toast from 'react-hot-toast'

function formatPrice(p) {
  return 'Rs. ' + p.toLocaleString('en-PK')
}

export default function FeaturedStrip() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)
  const addItem = useCartStore(s => s.addItem)

  useEffect(() => {
    getFeaturedProducts()
      .then(res => setProducts(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' })
    }
  }

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex gap-4 overflow-hidden">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="skeleton h-40" />
              <div className="p-4 space-y-2">
                <div className="skeleton h-3 w-full rounded" />
                <div className="skeleton h-5 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (!products.length) return null

  return (
    <section className="max-w-7xl mx-auto px-4 mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-xl font-bold text-sm">
            <Flame size={16} className="fill-rose-500 text-rose-500" />
            Flash Deals
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs text-gray-500 font-medium">Limited time offers</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="w-9 h-9 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-saffron-400 hover:text-saffron-600 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-9 h-9 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-saffron-400 hover:text-saffron-600 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product, i) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex-shrink-0 w-60 group"
          >
            <Link to={`/product/${product.slug}`}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                {/* Image */}
                <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-saffron-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs text-saffron-600 font-semibold mb-0.5">{product.brand}</p>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2 group-hover:text-saffron-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-gray-700">{product.rating?.toFixed(1)}</span>
                    <span className="text-xs text-gray-400">({product.reviewCount})</span>
                  </div>

                  {/* Price row */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-base text-gray-900">{formatPrice(product.price)}</div>
                      {product.originalPrice > product.price && (
                        <div className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        addItem(product)
                        toast.success('Added to cart!')
                      }}
                      className="w-9 h-9 bg-saffron-500 hover:bg-saffron-600 text-white rounded-xl flex items-center justify-center transition-colors active:scale-90"
                    >
                      <ShoppingCart size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
