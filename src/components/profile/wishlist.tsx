import { Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  inStock: boolean
}

const WISHLIST_ITEMS: WishlistItem[] = [
  {
    id: "1",
    name: "高級無線耳機",
    price: 2499,
    image: "/premium-wireless-headphones.png",
    inStock: true,
  },
  {
    id: "2",
    name: "智能手錶",
    price: 1999,
    image: "/smart-watch-modern.jpg",
    inStock: true,
  },
  {
    id: "3",
    name: "USB-C 集線器",
    price: 899,
    image: "/portable-charger-sleek.jpg",
    inStock: false,
  },
]

export function Wishlist() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">願望清單</h2>

      {WISHLIST_ITEMS.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">您的願望清單是空的</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WISHLIST_ITEMS.map((item) => (
            <div
              key={item.id}
              className="ounded-lg border border-border overflow-hidden hover:border-primary transition-smooth"
            >
              <div className="relative bg-muted aspect-square overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-smooth duration-500"
                />
                <button className="absolute top-3 right-3 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-smooth">
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>

              <div className="p-4">
                <Link href={`/products/${item.id}`}>
                  <h3 className="font-semibold text-foreground hover:text-primary transition-smooth mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-foreground mb-4">NT${item.price.toLocaleString()}</p>

                <button
                  disabled={!item.inStock}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-smooth ${
                    item.inStock
                      ? "bg-primary hover:bg-primary-dark text-white"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {item.inStock ? "加入購物車" : "缺貨"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
