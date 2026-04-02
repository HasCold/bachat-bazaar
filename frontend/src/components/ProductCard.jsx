import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart, Zap } from 'lucide-react'
import { useState } from 'react'
import useCartStore from '../store/cartStore'
import toast from 'react-hot-toast'

const badgeStyles = {
  hot: 'bg-rose-500 text-white',
  new: 'bg-emerald-500 text-white',
  sale: 'bg-saffron-500 text-white',
  top: 'bg-purple-600 text-white',
}

function formatPrice(p) {
  return 'Rs. ' + p.toLocaleString('en-PK')
}

export default function ProductCard({ product, index = 0 }) {
  const [wished, setWished] = useState(false)
  const [imgError, setImgError] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success(`${product.name.slice(0, 25)}... added to cart!`, { duration: 2000 })
  }

  const handleWish = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setWished(!wished)
    toast(wished ? 'Removed from wishlist' : '❤️ Added to wishlist!', { duration: 1500 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/product/${product.slug}`} className="block group">
        <div className="bg-white rounded-2xl overflow-hidden card-shadow hover:scale-[1.02] transition-transform duration-300 relative">
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            {product.badge && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeStyles[product.badge]}`}>
                {product.badge.toUpperCase()}
              </span>
            )}
            {product.discount > 0 && (
              <span className="bg-saffron-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWish}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart size={16} className={wished ? 'fill-rose-500 text-rose-500' : 'text-gray-400'} />
          </button>

          {/* Image */}
          <div className="relative h-52 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {!imgError ? (
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl">🛍️</div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-sm bg-black/60 px-3 py-1 rounded-full">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            {/* Category */}
            <div className="text-xs font-semibold text-saffron-600 uppercase tracking-wide mb-1">{product.category}</div>

            {/* Name */}
            <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-saffron-600 transition-colors">
              {product.name}
            </h3>

            {/* Short desc */}
            {product.shortDescription && (
              <p className="text-xs text-gray-400 mb-2 line-clamp-1">{product.shortDescription}</p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={11} className={s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium">({product.reviewCount?.toLocaleString()})</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-2 mb-3">
              <span className="font-display font-bold text-lg text-gray-900">{formatPrice(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through mb-0.5">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                product.inStock
                  ? 'bg-saffron-500 hover:bg-saffron-600 text-white shadow-md shadow-saffron-200/60'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={15} />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
