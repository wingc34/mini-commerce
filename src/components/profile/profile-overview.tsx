import { Mail, Phone, MapPin, Calendar, Edit2 } from "lucide-react"

export function ProfileOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">個人資訊</h2>
        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-smooth">
          <Edit2 className="w-4 h-4" />
          編輯
        </button>
      </div>

      {/* Profile Card */}
      <div className="rounded-lg border border-border p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-linear-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-2xl font-bold">
            王
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">王小明</h3>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">電子郵件</p>
              <p className="font-medium text-foreground">wang.xiaoming@email.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">電話號碼</p>
              <p className="font-medium text-foreground">+886 9 1234 5678</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">預設地址</p>
              <p className="font-medium text-foreground">台北市信義區信義路五段 1 號</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Calendar className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">加入日期</p>
              <p className="font-medium text-foreground">2024 年 1 月 15 日</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-200 rounded-lg p-6 border border-blue-200 dark:bg-blue-500">
          <p className="text-sm text-textPrimary mb-2">總訂單數</p>
          <p className="text-3xl font-bold text-textPrimary">12</p>
        </div>
        <div className="bg-green-200 rounded-lg p-6 border border-green-200 dark:bg-green-500">
          <p className="text-sm text-textPrimary mb-2">總消費金額</p>
          <p className="text-3xl font-bold text-textPrimary">NT$45,980</p>
        </div>
      </div>
    </div>
  )
}
