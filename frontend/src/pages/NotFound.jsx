import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-saffron-50 to-orange-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* Big 404 */}
        <div className="font-display font-black text-[10rem] leading-none text-saffron-200 select-none mb-0">
          404
        </div>
        <div className="text-4xl mb-4">🛒</div>
        <h1 className="font-display font-bold text-2xl text-gray-900 mb-3">
          Yeh page nahi mila!
        </h1>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          The page you're looking for doesn't exist or may have been moved. Let's get you back to shopping!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <Home size={18} />
            Back to Home
          </Link>
          <Link to="/?search=" className="btn-outline flex items-center justify-center gap-2">
            <Search size={18} />
            Browse Products
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
