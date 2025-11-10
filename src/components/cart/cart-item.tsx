"use client"

import { Trash2, Plus, Minus } from "lucide-react"

interface CartItemProps {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

export function CartItem({ id, name, price, quantity, image, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 py-6 border-b border-border">
      {/* Image */}
      <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden shrink-0">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-textPrimary mb-2 line-clamp-2">{name}</h3>
        <p className="text-lg font-bold text-textPrimary">NT${price.toLocaleString()}</p>
      </div>

      {/* Quantity Control */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className="w-8 h-8 border border-border rounded-lg hover:bg-muted transition-smooth flex items-center justify-center"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center font-semibold">{quantity}</span>
        <button
          onClick={() => onQuantityChange(quantity + 1)}
          className="w-8 h-8 border border-border rounded-lg hover:bg-muted transition-smooth flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Total */}
      <div className="text-right min-w-fit">
        <p className="text-lg font-bold text-textPrimary">NT${(price * quantity).toLocaleString()}</p>
        <p className="text-sm text-textSecondary">{quantity} 件</p>
      </div>

      {/* Remove */}
      <button onClick={onRemove} className="text-textSecondary hover:text-red-500 transition-smooth shrink-0">
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}
