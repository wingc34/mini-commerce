import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HeroBanner() {
  return (
    <section className="relative bg-linear-to-r text-white overflow-hidden from-primary to-primary-dark">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-semibold">✨ 2025 年新品上市</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">發現您的完美風格</h1>

            <p className="text-lg text-white/90 max-w-lg text-pretty">
              探索我們精心挑選的產品系列，每一件都代表品質、創新和風格的完美結合。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-gray-900 font-semibold px-8 py-4 rounded-lg transition-smooth"
              >
                開始購物
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-lg transition-smooth backdrop-blur-sm"
              >
                了解更多
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-sm text-white/80">滿意客戶</p>
              </div>
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm text-white/80">優質產品</p>
              </div>
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm text-white/80">客戶支援</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-linear-to-br from-secondary/20 to-transparent rounded-2xl"></div>
            <img
              src="/modern-fashion-display.png"
              alt="Featured Product"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}