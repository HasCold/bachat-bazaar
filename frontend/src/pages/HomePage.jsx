import { useState } from 'react'
import HeroBanner from '../components/HeroBanner'
import PromoBanner from '../components/PromoBanner'
import CategoryBar from '../components/CategoryBar'
import FeaturedStrip from '../components/FeaturedStrip'
import ProductGrid from '../components/ProductGrid'
import { motion } from 'framer-motion'
import { Flame, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const INFO_CARDS = [
  {
    emoji: '🛡️',
    title: 'Buyer Protection',
    desc: 'Every purchase is covered by our 7-day return and money-back guarantee.',
    color: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    text: 'text-blue-800'
  },
  {
    emoji: '🚚',
    title: 'Fast Nationwide Delivery',
    desc: 'Delivered to all major cities and districts across Pakistan.',
    color: 'from-emerald-50 to-emerald-100',
    border: 'border-emerald-200',
    text: 'text-emerald-800'
  },
  {
    emoji: '💬',
    title: '24/7 Customer Support',
    desc: 'Chat with our team anytime — in Urdu or English.',
    color: 'from-purple-50 to-purple-100',
    border: 'border-purple-200',
    text: 'text-purple-800'
  },
  {
    emoji: '⭐',
    title: 'Verified Reviews',
    desc: 'All ratings are from real buyers — honest and transparent.',
    color: 'from-amber-50 to-amber-100',
    border: 'border-amber-200',
    text: 'text-amber-800'
  },
]

const PROMO_BANNERS = [
  {
    title: 'Eid Collection',
    subtitle: 'Up to 40% off on fashion',
    emoji: '🌙',
    bg: 'from-violet-600 to-purple-700',
    link: '/?category=Clothing'
  },
  {
    title: 'Tech Bonanza',
    subtitle: 'Latest gadgets, best prices',
    emoji: '⚡',
    bg: 'from-blue-600 to-cyan-600',
    link: '/?category=Electronics'
  },
  {
    title: 'Kitchen Deals',
    subtitle: 'Equip your home kitchen',
    emoji: '🍳',
    bg: 'from-amber-500 to-orange-600',
    link: '/?category=Kitchen'
  },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('')

  return (
    <div>
      <HeroBanner />
      <PromoBanner />

      {/* Trust badges */}
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {INFO_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`bg-gradient-to-br ${card.color} border ${card.border} rounded-2xl p-4`}
            >
              <div className="text-3xl mb-2">{card.emoji}</div>
              <h3 className={`font-bold text-sm ${card.text} mb-1`}>{card.title}</h3>
              <p className={`text-xs ${card.text} opacity-75 leading-relaxed`}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mini promo banners */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PROMO_BANNERS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={b.link}
                className={`flex items-center justify-between bg-gradient-to-r ${b.bg} rounded-2xl px-5 py-4 group hover:scale-[1.02] transition-transform`}>
                <div>
                  <div className="text-white/80 text-xs font-semibold uppercase tracking-wide mb-0.5">{b.subtitle}</div>
                  <div className="text-white font-display font-bold text-lg">{b.title}</div>
                  <div className="flex items-center gap-1 text-white/80 text-xs font-medium mt-1 group-hover:gap-2 transition-all">
                    Shop Now <ArrowRight size={12} />
                  </div>
                </div>
                <div className="text-4xl opacity-90">{b.emoji}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Flash Deals horizontal strip */}
      <FeaturedStrip />

      {/* Category selector */}
      <CategoryBar activeCategory={activeCategory} onSelect={setActiveCategory} />

      {/* Section divider */}
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-saffron-100 text-saffron-700 px-4 py-2 rounded-xl font-semibold text-sm">
            <Flame size={16} className="fill-saffron-500 text-saffron-500" />
            {activeCategory ? activeCategory : 'All Products'}
          </div>
          <div className="h-px flex-1 bg-gray-100" />
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock size={13} />
            Updated Daily
          </div>
        </div>
      </div>

      {/* Main product grid */}
      <ProductGrid activeCategory={activeCategory} />

      {/* Brand strip */}
      <section className="bg-white border-y border-gray-100 py-10 mb-0">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            Top Brands Available on Bachat Bazaar
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Samsung', 'Sony', 'Nike', 'Dell', 'Haier', 'Dawlance',
              'Gul Ahmed', 'Khaadi', 'Sapphire', 'JBL', 'Philips',
              'Bosch', 'HP', 'Logitech', 'Anker', 'Xiaomi', 'Realme',
              'Kenwood', 'Prestige', 'Nestlé', 'Himalaya', 'Molfix'
            ].map(brand => (
              <motion.button
                key={brand}
                whileHover={{ scale: 1.05 }}
                onClick={() => {}}
                className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-600 hover:bg-saffron-50 hover:text-saffron-700 hover:border-saffron-200 transition-colors"
              >
                {brand}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-4xl mb-3">🎁</div>
          <h2 className="font-display font-bold text-3xl text-white mb-3">
            Never Miss a Deal
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            Join 500,000+ smart shoppers. Get exclusive deals, flash sales and new arrivals delivered to your inbox.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-saffron-400"
            />
            <button className="btn-primary py-3 px-5 text-sm whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-gray-600 text-xs mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  )
}
