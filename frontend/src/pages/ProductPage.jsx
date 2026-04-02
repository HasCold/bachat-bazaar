import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart, Heart, Share2, Star, ChevronLeft, ChevronRight,
  Truck, Shield, RefreshCw, Zap, Package, MessageSquare,
  Plus, Minus, Check, ChevronDown, ChevronUp, Tag, BadgeCheck
} from 'lucide-react'
import { getProductBySlug, getRelatedProducts } from '../utils/api'
import PriceHistoryChart from '../components/PriceHistoryChart'
import ProductCard from '../components/ProductCard'
import useCartStore, { selectCount } from '../store/cartStore'
import toast from 'react-hot-toast'

function formatPrice(p) {
  return 'Rs. ' + Math.round(p).toLocaleString('en-PK')
}

function StarRow({ rating, count }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(s => (
          <Star key={s} size={18}
            className={s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-100'} />
        ))}
      </div>
      <span className="font-bold text-gray-900 text-lg">{rating?.toFixed(1)}</span>
      <span className="text-gray-500 text-sm">({count?.toLocaleString()} reviews)</span>
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4">
      <div className="flex items-start gap-3 mb-3">
        <img
          src={review.avatar || `https://i.pravatar.cc/40?u=${encodeURIComponent(review.user)}`}
          alt={review.user}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0 bg-gray-200"
          onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.user)}&background=ff7c0a&color=fff` }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-gray-900">{review.user}</span>
              <BadgeCheck size={14} className="text-saffron-500" />
            </div>
            <span className="text-xs text-gray-400">
              {new Date(review.date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <div className="flex gap-0.5 mt-0.5">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} size={12} className={s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
    </div>
  )
}

// Filler reviews for demo when product has few
const FILLER_REVIEWS = [
  { user: 'Muhammad Hamza', avatar: 'https://i.pravatar.cc/40?img=33', rating: 5, comment: 'Excellent product! Exactly as described. Delivery was fast and packaging was secure. Highly recommended for anyone looking for quality at this price.', date: '2026-02-14' },
  { user: 'Sana Waheed', avatar: 'https://i.pravatar.cc/40?img=47', rating: 4, comment: 'Very good quality. Minor issue with packaging but the product itself is great. Customer support was very responsive when I had a query.', date: '2026-01-28' },
  { user: 'Tariq Mehmood', avatar: 'https://i.pravatar.cc/40?img=56', rating: 5, comment: 'MashaAllah, bahut acha product hai. Bilkul waise hi mila jaise photo mein tha. Delivery bhi time par thi. Bahut khush hain.', date: '2026-01-10' },
  { user: 'Rabia Farooq', avatar: 'https://i.pravatar.cc/40?img=44', rating: 3, comment: 'Product is decent but delivery took a bit longer than expected. Quality is good though, no complaints on that front.', date: '2025-12-20' },
  { user: 'Imran Siddiqui', avatar: 'https://i.pravatar.cc/40?img=61', rating: 5, comment: 'Amazing value for money. Will definitely buy again. Packaging was excellent, no damage during shipping.', date: '2025-12-05' },
]

const RATING_DIST = [
  { star: 5, pct: 62 },
  { star: 4, pct: 22 },
  { star: 3, pct: 10 },
  { star: 2, pct: 4 },
  { star: 1, pct: 2 },
]

export default function ProductPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedImg, setSelectedImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [wished, setWished] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [showAllReviews, setShowAllReviews] = useState(false)

  const addItem = useCartStore(s => s.addItem)
  const toggleCart = useCartStore(s => s.toggleCart)

  useEffect(() => {
    setLoading(true)
    setError(false)
    setSelectedImg(0)
    setQty(1)
    setActiveTab('description')
    window.scrollTo({ top: 0, behavior: 'smooth' })

    Promise.all([getProductBySlug(slug), getRelatedProducts(slug)])
      .then(([pRes, rRes]) => {
        setProduct(pRes.data.data)
        setRelated(rRes.data.data)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  const handleAddToCart = () => {
    if (!product) return
    // Add item once, cart store increments qty
    addItem({ ...product, qty: undefined })
    // Then update qty if > 1
    if (qty > 1) {
      for (let i = 1; i < qty; i++) addItem({ ...product, qty: undefined })
    }
    toast.success(`Added ${qty} item${qty > 1 ? 's' : ''} to cart! 🛒`, { duration: 2000 })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    setTimeout(() => toggleCart(), 300)
  }

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="h-5 skeleton w-48 rounded mb-8" />
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <div className="skeleton rounded-3xl h-96" />
            <div className="flex gap-3">
              {[0,1,2].map(i => <div key={i} className="skeleton w-20 h-20 rounded-2xl" />)}
            </div>
          </div>
          <div className="space-y-5">
            <div className="skeleton h-5 w-32 rounded-full" />
            <div className="skeleton h-9 w-full rounded-xl" />
            <div className="skeleton h-9 w-3/4 rounded-xl" />
            <div className="skeleton h-5 w-48 rounded" />
            <div className="skeleton h-24 rounded-2xl" />
            <div className="skeleton h-14 rounded-2xl" />
            <div className="skeleton h-14 rounded-2xl" />
          </div>
        </div>
      </div>
    )
  }

  // Error / not found state
  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Package size={72} className="text-gray-200 mb-4" />
        <h2 className="font-display font-bold text-2xl text-gray-400 mb-2">Product not found</h2>
        <p className="text-gray-400 text-sm mb-6">This product may have been removed or the link is incorrect.</p>
        <Link to="/" className="btn-primary">Back to Shop</Link>
      </div>
    )
  }

  // Ensure images array has at least something
  const images = (product.images?.length ? product.images : [product.thumbnail]).filter(Boolean)
  const allReviews = [...(product.reviews || []), ...FILLER_REVIEWS]
  const displayedReviews = showAllReviews ? allReviews : allReviews.slice(0, 4)

  // Specifications: MongoDB Map serializes to plain object
  const specEntries = product.specifications
    ? Object.entries(product.specifications)
    : []

  // Highlights from shortDescription
  const highlights = (product.shortDescription || '')
    .split(' · ')
    .filter(Boolean)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
        <Link to="/" className="hover:text-saffron-600 font-medium transition-colors">Home</Link>
        <ChevronRight size={14} className="flex-shrink-0" />
        <Link
          to={`/?category=${encodeURIComponent(product.category)}`}
          className="hover:text-saffron-600 font-medium transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight size={14} className="flex-shrink-0" />
        <span className="text-gray-700 font-medium line-clamp-1">{product.name}</span>
      </nav>

      {/* ── Main grid ── */}
      <div className="grid md:grid-cols-2 gap-10 mb-14">

        {/* ═══ IMAGE COLUMN ═══ */}
        <div className="space-y-3">
          {/* Main image viewer */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden aspect-square max-h-[480px] group">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImg}
                src={images[selectedImg]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full object-cover"
                onError={e => { e.target.style.display = 'none' }}
              />
            </AnimatePresence>

            {/* Overlaid badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
              {product.badge && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full shadow ${
                  product.badge === 'hot' ? 'bg-rose-500 text-white' :
                  product.badge === 'new' ? 'bg-emerald-500 text-white' :
                  product.badge === 'sale' ? 'bg-saffron-500 text-white' :
                  'bg-purple-600 text-white'
                }`}>{product.badge.toUpperCase()}</span>
              )}
              {product.discount > 0 && (
                <span className="bg-saffron-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  -{product.discount}% OFF
                </span>
              )}
            </div>

            {/* Image nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImg(i => (i - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-xl shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-saffron-500 hover:text-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setSelectedImg(i => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-xl shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-saffron-500 hover:text-white"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Image counter pill */}
            {images.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur">
                {selectedImg + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Thumbnail row */}
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImg === i
                      ? 'border-saffron-500 scale-105 shadow-md shadow-saffron-200/60'
                      : 'border-gray-200 hover:border-saffron-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Social proof strip under image */}
          <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3">
            <span className="text-emerald-600 text-sm font-bold">✅ Verified Purchase</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 text-xs">{product.reviewCount?.toLocaleString()} people rated this product</span>
          </div>
        </div>

        {/* ═══ DETAILS COLUMN ═══ */}
        <div className="space-y-5">
          {/* Category + brand + stock */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-saffron-600 uppercase tracking-wide bg-saffron-50 px-3 py-1.5 rounded-full border border-saffron-100">
              {product.category}
            </span>
            <span className="text-xs text-gray-500 font-semibold bg-gray-100 px-3 py-1.5 rounded-full">
              {product.brand}
            </span>
            <span className="ml-auto">
              {product.inStock ? (
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock ({product.stock} left)
                </span>
              ) : (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-full">
                  Out of Stock
                </span>
              )}
            </span>
          </div>

          {/* Product name */}
          <h1 className="font-display font-bold text-2xl md:text-3xl text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* Highlights chips */}
          {highlights.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {highlights.map((h, i) => (
                <span key={i} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                  <Check size={11} className="text-blue-500" /> {h}
                </span>
              ))}
            </div>
          )}

          {/* Rating */}
          <StarRow rating={product.rating} count={product.reviewCount} />

          {/* Price block */}
          <div className="bg-gradient-to-r from-saffron-50 to-amber-50 border border-saffron-100 rounded-2xl p-5">
            <div className="flex items-end gap-3 mb-2 flex-wrap">
              <span className="font-display font-black text-4xl text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <div className="mb-1 flex flex-col">
                  <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    You save {formatPrice(product.originalPrice - product.price)} 🎉
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1.5">
              <Tag size={12} className="text-saffron-500" />
              Inclusive of all taxes · Cash on Delivery available nationwide
            </p>
          </div>

          {/* Qty picker */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">Quantity:</span>
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-bold text-base select-none">{qty}</span>
              <button
                onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                className="w-11 h-11 bg-saffron-500 text-white flex items-center justify-center hover:bg-saffron-600 active:bg-saffron-700 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <span className="text-sm text-gray-400 font-medium">
              {formatPrice(product.price * qty)} total
            </span>
          </div>

          {/* CTA buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm bg-saffron-500 hover:bg-saffron-600 text-white shadow-lg shadow-saffron-200 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Zap size={18} className="fill-white" />
              Buy Now
            </button>
          </div>

          {/* Wishlist + Share */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setWished(w => !w)
                toast(wished ? 'Removed from wishlist' : '❤️ Saved to wishlist!', { duration: 1500 })
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border-2 transition-all active:scale-95 ${
                wished
                  ? 'border-rose-300 bg-rose-50 text-rose-600'
                  : 'border-gray-200 text-gray-600 hover:border-rose-200 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              <Heart size={16} className={wished ? 'fill-rose-500 text-rose-500' : ''} />
              {wished ? 'Saved ❤️' : 'Add to Wishlist'}
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href).catch(() => {})
                toast('Link copied! 🔗', { duration: 1500 })
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              <Share2 size={16} />
              Share Product
            </button>
          </div>

          {/* Delivery info cards */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Truck, label: 'Free Delivery', sub: 'Orders ≥ Rs.2,000', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
              { icon: Shield, label: 'Authentic', sub: '100% Verified', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
              { icon: RefreshCw, label: '7-Day Return', sub: 'No questions', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
            ].map(({ icon: Icon, label, sub, color, bg, border }) => (
              <div key={label} className={`${bg} border ${border} rounded-xl p-3 text-center`}>
                <Icon size={18} className={`${color} mx-auto mb-1.5`} />
                <div className={`text-xs font-bold ${color} leading-tight`}>{label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="mb-14">
        <div className="flex border-b-2 border-gray-100 mb-8 overflow-x-auto gap-1">
          {[
            { id: 'description', label: 'Description', icon: Package },
            { id: 'specifications', label: 'Specifications', icon: Zap },
            { id: 'reviews', label: `Reviews (${allReviews.length})`, icon: MessageSquare },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-bold border-b-2 -mb-[2px] transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'border-saffron-500 text-saffron-600 bg-saffron-50 rounded-t-xl'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-t-xl'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {/* ── Description tab ── */}
            {activeTab === 'description' && (
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-4">About This Product</h3>
                  <p className="text-gray-600 leading-relaxed text-sm mb-6">{product.description}</p>
                  {product.tags?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 hover:bg-saffron-50 hover:text-saffron-700 text-gray-600 px-3 py-1 rounded-full font-medium cursor-pointer transition-colors">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-4">Key Highlights</h3>
                  <ul className="space-y-3">
                    {highlights.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 rounded-xl px-4 py-3">
                        <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Check size={14} className="text-emerald-600" />
                        </div>
                        {item}
                      </li>
                    ))}
                    <li className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 rounded-xl px-4 py-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check size={14} className="text-blue-600" />
                      </div>
                      Brand: <span className="font-semibold">{product.brand}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 rounded-xl px-4 py-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check size={14} className="text-purple-600" />
                      </div>
                      Category: <span className="font-semibold">{product.category}</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* ── Specifications tab ── */}
            {activeTab === 'specifications' && (
              <div className="max-w-2xl">
                <h3 className="font-display font-bold text-xl text-gray-900 mb-6">Technical Specifications</h3>
                {specEntries.length > 0 ? (
                  <div className="rounded-2xl overflow-hidden border border-gray-100">
                    {specEntries.map(([key, value], i) => (
                      <div
                        key={key}
                        className={`grid grid-cols-2 gap-4 px-5 py-4 text-sm border-b border-gray-50 last:border-0 ${
                          i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        }`}
                      >
                        <span className="font-semibold text-gray-700">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Package size={48} className="mx-auto mb-3 text-gray-200" />
                    <p className="text-sm">No specifications available for this product.</p>
                  </div>
                )}
              </div>
            )}

            {/* ── Reviews tab ── */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Rating summary card */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6 flex flex-col sm:flex-row gap-8">
                  <div className="text-center flex-shrink-0">
                    <div className="font-display font-black text-7xl text-gray-900 leading-none mb-1">
                      {product.rating?.toFixed(1)}
                    </div>
                    <div className="flex justify-center gap-0.5 mb-1">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={18} className={s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">{product.reviewCount?.toLocaleString()} ratings</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {RATING_DIST.map(({ star, pct }) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-gray-600 w-3">{star}</span>
                        <Star size={11} className="fill-amber-400 text-amber-400 flex-shrink-0" />
                        <div className="flex-1 h-2.5 bg-white rounded-full overflow-hidden border border-amber-100">
                          <motion.div
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: 0.1 * (5 - star) }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-8 text-right font-medium">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review cards grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {displayedReviews.map((rev, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <ReviewCard review={rev} />
                    </motion.div>
                  ))}
                </div>

                {allReviews.length > 4 && (
                  <button
                    onClick={() => setShowAllReviews(v => !v)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 hover:border-saffron-400 hover:text-saffron-600 hover:bg-saffron-50 transition-all"
                  >
                    {showAllReviews ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    {showAllReviews ? 'Show Less Reviews' : `View All ${allReviews.length} Reviews`}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Price History Chart ── */}
      {product.priceHistory?.length > 0 && (
        <div className="mb-14">
          <PriceHistoryChart priceHistory={product.priceHistory} currentPrice={product.price} />
        </div>
      )}

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-display font-bold text-2xl text-gray-900">You May Also Like</h2>
            <div className="h-px flex-1 bg-gray-100" />
            <Link
              to={`/?category=${encodeURIComponent(product.category)}`}
              className="text-sm font-semibold text-saffron-600 hover:text-saffron-700 whitespace-nowrap"
            >
              See All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {related.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
