import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, Truck, RefreshCw } from 'lucide-react'

const badges = [
  { icon: Truck, label: 'Free Delivery', sub: 'Orders over Rs.2,000' },
  { icon: Shield, label: '100% Authentic', sub: 'Verified Products' },
  { icon: RefreshCw, label: 'Easy Returns', sub: '7-Day Policy' },
  { icon: Zap, label: 'Best Prices', sub: 'Daily Deals' },
]

const floatingTags = [
  { label: '50% OFF', top: '18%', left: '6%', color: 'bg-rose-500' },
  { label: 'NEW IN', top: '60%', left: '3%', color: 'bg-emerald-500' },
  { label: 'HOT 🔥', top: '30%', right: '5%', color: 'bg-orange-500' },
  { label: 'SALE', top: '70%', right: '7%', color: 'bg-purple-500' },
]

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0a00] via-[#2d1200] to-[#1a0a00] min-h-[520px] flex flex-col justify-center">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'linear-gradient(rgba(255,124,10,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,124,10,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-saffron-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl" />

      {/* Floating tags */}
      {floatingTags.map((tag) => (
        <motion.div
          key={tag.label}
          className={`absolute ${tag.color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg hidden lg:block`}
          style={{ top: tag.top, left: tag.left, right: tag.right }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
        >
          {tag.label}
        </motion.div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-saffron-500/20 border border-saffron-500/40 text-saffron-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
        >
          <Zap size={14} className="fill-saffron-400 text-saffron-400" />
          Pakistan's Most Trusted Deals Platform
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-7xl font-black text-white leading-none mb-4"
        >
          بچت بازار
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-2xl md:text-3xl font-bold text-saffron-400 mb-3"
        >
          Bachat Bazaar
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium"
        >
          Discover <span className="text-saffron-400 font-bold">unbeatable deals</span> on Mobiles, Appliances, Fashion & More — delivered to your doorstep across Pakistan.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
        >
          <a href="#products" className="btn-primary flex items-center justify-center gap-2 text-base">
            Shop Now <ArrowRight size={18} />
          </a>
          <a href="#categories" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-base">
            Browse Categories
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {[['10,000+', 'Products'], ['500,000+', 'Happy Customers'], ['50+', 'Top Brands'], ['24/7', 'Support']].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="font-display font-bold text-2xl text-saffron-400">{num}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
        >
          {badges.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="bg-white/8 border border-white/15 rounded-2xl px-4 py-3 flex items-center gap-3 backdrop-blur-sm">
              <div className="w-9 h-9 bg-saffron-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-saffron-400" />
              </div>
              <div className="text-left">
                <div className="text-white text-xs font-bold leading-tight">{label}</div>
                <div className="text-gray-400 text-xs">{sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full">
          <path d="M0 60L1440 60L1440 30C1200 0 960 60 720 30C480 0 240 60 0 30L0 60Z" fill="#fafaf8" />
        </svg>
      </div>
    </section>
  )
}
