import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, PackageOpen } from 'lucide-react'
import useCartStore, { selectTotal, selectCount } from '../store/cartStore'

function formatPrice(p) {
  return 'Rs. ' + Math.round(p).toLocaleString('en-PK')
}

export default function CartDrawer() {
  const items = useCartStore(s => s.items)
  const isOpen = useCartStore(s => s.isOpen)
  const closeCart = useCartStore(s => s.closeCart)
  const removeItem = useCartStore(s => s.removeItem)
  const updateQty = useCartStore(s => s.updateQty)
  const clearCart = useCartStore(s => s.clearCart)
  const total = useCartStore(selectTotal)
  const count = useCartStore(selectCount)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-saffron-100 rounded-xl flex items-center justify-center">
                  <ShoppingBag size={18} className="text-saffron-600" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-gray-900">Your Cart</h2>
                  <p className="text-xs text-gray-500">{count} item{count !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button onClick={clearCart} className="text-xs text-rose-500 hover:text-rose-600 font-semibold px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors">
                    Clear all
                  </button>
                )}
                <button onClick={closeCart} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-64 text-center"
                  >
                    <PackageOpen size={56} className="text-gray-200 mb-4" />
                    <h3 className="font-display font-bold text-gray-400 text-lg">Your cart is empty</h3>
                    <p className="text-gray-400 text-sm mt-1">Add items to get started!</p>
                    <button onClick={closeCart} className="mt-6 btn-primary text-sm py-2.5">
                      Continue Shopping
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      className="flex gap-3 bg-gray-50 rounded-2xl p-3"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0">
                        <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-gray-900 text-sm">{formatPrice(item.price)}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQty(item._id, item.qty - 1)}
                              className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-saffron-400 transition-colors"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="font-bold text-sm w-5 text-center">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item._id, item.qty + 1)}
                              className="w-7 h-7 rounded-lg bg-saffron-500 text-white flex items-center justify-center hover:bg-saffron-600 transition-colors"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-400">Subtotal: {formatPrice(item.price * item.qty)}</span>
                          <button onClick={() => removeItem(item._id)} className="text-rose-400 hover:text-rose-600 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal ({count} items)</span>
                    <span className="font-semibold">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery</span>
                    <span className="text-emerald-600 font-semibold">{total >= 2000 ? 'Free 🎉' : formatPrice(199)}</span>
                  </div>
                  {total < 2000 && (
                    <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                      Add {formatPrice(2000 - total)} more for free delivery!
                    </p>
                  )}
                  <div className="flex justify-between font-display font-bold text-lg text-gray-900 pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-saffron-600">{formatPrice(total >= 2000 ? total : total + 199)}</span>
                  </div>
                </div>
                <button className="w-full btn-primary flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
                <p className="text-center text-xs text-gray-400">🔒 Secure checkout · Cash on Delivery available</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
