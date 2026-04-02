import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'

function formatPrice(p) {
  return 'Rs. ' + Math.round(p).toLocaleString('en-PK')
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-xl rounded-xl p-3">
        <p className="text-xs font-semibold text-gray-500 mb-1">{label}</p>
        <p className="text-base font-bold text-gray-900">{formatPrice(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

export default function PriceHistoryChart({ priceHistory, currentPrice }) {
  if (!priceHistory?.length) return null

  const prices = priceHistory.map(p => p.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const firstPrice = prices[0]
  const diff = currentPrice - firstPrice
  const diffPct = ((diff / firstPrice) * 100).toFixed(1)
  const trending = diff < 0 ? 'down' : diff > 0 ? 'up' : 'flat'

  const trendColor = trending === 'down' ? '#16a34a' : trending === 'up' ? '#ef4444' : '#6b7280'
  const TrendIcon = trending === 'down' ? TrendingDown : trending === 'up' ? TrendingUp : Minus

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-display font-bold text-lg text-gray-900">Price History</h3>
          <p className="text-sm text-gray-500 mt-0.5">Last 12 months</p>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold`}
          style={{ backgroundColor: trendColor + '18', color: trendColor }}>
          <TrendIcon size={15} />
          {Math.abs(diffPct)}% {trending === 'down' ? 'cheaper' : trending === 'up' ? 'costlier' : 'stable'}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center bg-emerald-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 font-medium mb-1">Lowest</p>
          <p className="font-bold text-emerald-700 text-sm">{formatPrice(minPrice)}</p>
        </div>
        <div className="text-center bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 font-medium mb-1">Average</p>
          <p className="font-bold text-gray-700 text-sm">{formatPrice(prices.reduce((a, b) => a + b, 0) / prices.length)}</p>
        </div>
        <div className="text-center bg-rose-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 font-medium mb-1">Highest</p>
          <p className="font-bold text-rose-700 text-sm">{formatPrice(maxPrice)}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={priceHistory} margin={{ top: 5, right: 5, bottom: 0, left: 10 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff7c0a" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#ff7c0a" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: '#9ca3af', fontFamily: 'Plus Jakarta Sans' }}
              tickLine={false}
              axisLine={false}
              interval={1}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#9ca3af', fontFamily: 'Plus Jakarta Sans' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              width={36}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={currentPrice}
              stroke="#ff7c0a"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{ value: 'Current', position: 'right', fontSize: 10, fill: '#ff7c0a' }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#ff7c0a"
              strokeWidth={2.5}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{ r: 5, fill: '#ff7c0a', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        💡 {trending === 'down' ? 'Great time to buy — price is trending down!' : trending === 'up' ? 'Price has gone up — wait for a deal!' : 'Price has been stable over the past year.'}
      </p>
    </div>
  )
}
