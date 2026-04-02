export default function PromoBanner() {
  const items = [
    '🔥 Summer Sale — Up to 50% OFF',
    '📦 Free Delivery on Orders above Rs. 2,000',
    '✅ 100% Authentic Products',
    '🔄 7-Day Easy Returns',
    '💳 Jazz Cash & Easypaisa Accepted',
    '🚀 Same-day Dispatch in Karachi',
    '⚡ Flash Deals Every Friday',
    '🎁 Gift Wrapping Available',
  ]

  return (
    <div className="bg-saffron-500 overflow-hidden py-2.5">
      <div className="flex whitespace-nowrap" style={{ animation: 'marquee 35s linear infinite' }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-white text-sm font-semibold mx-8 flex-shrink-0">
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
