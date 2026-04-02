import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X, MapPin, Phone, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore, { selectCount } from '../store/cartStore'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const count = useCartStore(selectCount)
  const toggleCart = useCartStore(s => s.toggleCart)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) navigate(`/?search=${encodeURIComponent(search.trim())}`)
  }

  return (
    <>
      {/* Top bar */}
      <div className="bg-saffron-600 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><MapPin size={11} /> Delivering across Pakistan 🇵🇰</span>
            <span className="hidden sm:flex items-center gap-1"><Phone size={11} /> 0311-BACHAT (222428)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block">Free delivery on orders above Rs. 2,000</span>
            <span className="font-semibold animate-pulse">🔥 Summer Sale — Up to 50% Off!</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-saffron-500 rounded-xl flex items-center justify-center shadow-md shadow-saffron-200">
                <span className="text-white font-display font-bold text-lg leading-none">ب</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-xl text-gray-900 leading-none">Bachat Bazaar</div>
                <div className="text-saffron-500 text-xs font-medium">بچت بازار · Save More, Shop Smart</div>
              </div>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="w-full pl-5 pr-14 py-3 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-saffron-400 focus:outline-none transition-all text-sm font-medium placeholder:text-gray-400"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-saffron-500 hover:bg-saffron-600 text-white p-2 rounded-xl transition-colors">
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleCart}
                className="relative flex items-center gap-2 bg-saffron-50 hover:bg-saffron-100 border-2 border-saffron-200 text-saffron-700 font-semibold px-4 py-2.5 rounded-2xl transition-all group"
              >
                <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:block text-sm">Cart</span>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-saffron-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {count > 9 ? '9+' : count}
                  </motion.span>
                )}
              </button>

              <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden p-2 rounded-xl hover:bg-gray-100">
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Category nav */}
          <div className="hidden sm:flex items-center gap-1 mt-2 pt-2 border-t border-gray-100 overflow-x-auto scrollbar-hide">
            {['All', 'Mobiles', 'Laptops', 'Home Appliances', 'Kitchen', 'Clothing', 'Footwear', 'Electronics', 'Groceries', 'Baby & Kids', 'Tools & Hardware'].map((cat) => (
              <Link
                key={cat}
                to={cat === 'All' ? '/' : `/?category=${cat}`}
                className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg text-gray-600 hover:text-saffron-600 hover:bg-saffron-50 transition-all whitespace-nowrap"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden overflow-hidden bg-white border-t border-gray-100 px-4 pb-4"
            >
              <div className="flex flex-wrap gap-2 pt-3">
                {['Mobiles', 'Laptops', 'Home Appliances', 'Kitchen', 'Clothing', 'Footwear', 'Electronics', 'Groceries'].map((cat) => (
                  <Link key={cat} to={`/?category=${cat}`} onClick={() => setMenuOpen(false)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-saffron-100 hover:text-saffron-700 transition-all">
                    {cat}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
