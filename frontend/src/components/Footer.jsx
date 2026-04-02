import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-saffron-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">ب</span>
            </div>
            <div>
              <div className="font-display font-bold text-white text-lg leading-none">Bachat Bazaar</div>
              <div className="text-saffron-400 text-xs">بچت بازار</div>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            Pakistan's most trusted online marketplace. Connecting millions of buyers with thousands of sellers across the country since 2019.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Facebook, href: '#' },
              { Icon: Instagram, href: '#' },
              { Icon: Youtube, href: '#' },
              { Icon: Twitter, href: '#' },
            ].map(({ Icon, href }) => (
              <a key={href + Icon.name} href={href}
                className="w-9 h-9 bg-gray-800 hover:bg-saffron-500 rounded-xl flex items-center justify-center transition-colors group">
                <Icon size={16} className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-white text-base mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {['All Products', 'Today\'s Deals', 'Featured Items', 'New Arrivals', 'Best Sellers', 'Clearance Sale'].map(l => (
              <li key={l}><Link to="/" className="text-sm text-gray-400 hover:text-saffron-400 transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-display font-bold text-white text-base mb-4">Categories</h4>
          <ul className="space-y-2.5">
            {['Mobiles & Tablets', 'Laptops & Computers', 'Home Appliances', 'Fashion & Clothing', 'Kitchen & Dining', 'Electronics', 'Baby & Kids', 'Groceries'].map(c => (
              <li key={c}><Link to="/" className="text-sm text-gray-400 hover:text-saffron-400 transition-colors">{c}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-bold text-white text-base mb-4">Contact Us</h4>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-saffron-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">Plot 42, IT Tower, Karachi, Pakistan</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-saffron-400 flex-shrink-0" />
              <span className="text-sm text-gray-400">0311-BACHAT (222428)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-saffron-400 flex-shrink-0" />
              <span className="text-sm text-gray-400">support@bachatbazaar.pk</span>
            </li>
          </ul>
          <div className="bg-gray-800 rounded-2xl p-4">
            <p className="text-xs font-bold text-white mb-1">Customer Support Hours</p>
            <p className="text-xs text-gray-400">Mon–Sat: 9:00 AM – 10:00 PM</p>
            <p className="text-xs text-gray-400">Sunday: 10:00 AM – 6:00 PM</p>
          </div>
        </div>
      </div>

      {/* Payment & trust */}
      <div className="border-t border-gray-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-xs text-gray-500 font-semibold">Accepted Payments:</span>
            {['Jazz Cash', 'Easypaisa', 'HBL', 'UBL', 'Cash on Delivery'].map(p => (
              <span key={p} className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-lg font-medium">{p}</span>
            ))}
          </div>
          <p className="text-xs text-gray-600 text-center">
            © {new Date().getFullYear()} Bachat Bazaar Pvt. Ltd. All rights reserved. 🇵🇰
          </p>
        </div>
      </div>
    </footer>
  )
}
