import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Smartphone, Monitor, Wind, ChefHat, Shirt, Footprints, Zap, ShoppingBasket, Baby, Wrench } from 'lucide-react'

const categories = [
  { name: 'Mobiles', icon: Smartphone, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-700', emoji: '📱' },
  { name: 'Laptops', icon: Monitor, color: 'from-slate-600 to-slate-700', bg: 'bg-slate-50', text: 'text-slate-700', emoji: '💻' },
  { name: 'Home Appliances', icon: Wind, color: 'from-cyan-500 to-cyan-600', bg: 'bg-cyan-50', text: 'text-cyan-700', emoji: '🏠' },
  { name: 'Kitchen', icon: ChefHat, color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', text: 'text-amber-700', emoji: '🍳' },
  { name: 'Clothing', icon: Shirt, color: 'from-pink-500 to-pink-600', bg: 'bg-pink-50', text: 'text-pink-700', emoji: '👗' },
  { name: 'Footwear', icon: Footprints, color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', text: 'text-orange-700', emoji: '👟' },
  { name: 'Electronics', icon: Zap, color: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-50', text: 'text-yellow-700', emoji: '⚡' },
  { name: 'Groceries', icon: ShoppingBasket, color: 'from-green-500 to-green-600', bg: 'bg-green-50', text: 'text-green-700', emoji: '🛒' },
  { name: 'Baby & Kids', icon: Baby, color: 'from-purple-400 to-purple-500', bg: 'bg-purple-50', text: 'text-purple-700', emoji: '🧸' },
  { name: 'Tools & Hardware', icon: Wrench, color: 'from-gray-600 to-gray-700', bg: 'bg-gray-100', text: 'text-gray-700', emoji: '🔧' },
]

export default function CategoryBar({ activeCategory, onSelect }) {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-2xl text-gray-900">Shop by Category</h2>
          <p className="text-gray-500 text-sm mt-1">Find exactly what you're looking for</p>
        </div>
        <Link to="/" onClick={() => onSelect && onSelect('')}
          className="text-sm font-semibold text-saffron-600 hover:text-saffron-700 flex items-center gap-1">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-3">
        {categories.map((cat, i) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.name
          return (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onSelect && onSelect(isActive ? '' : cat.name)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl cursor-pointer transition-all duration-200 group ${
                isActive
                  ? `bg-gradient-to-br ${cat.color} text-white shadow-lg scale-105`
                  : `${cat.bg} hover:scale-105 hover:shadow-md`
              }`}
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className={`text-center leading-tight font-semibold text-xs ${isActive ? 'text-white' : cat.text}`}>
                {cat.name.replace(' & ', '\n& ')}
              </span>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
