import { MapPin, Edit2, Trash2, Plus } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
}

const ADDRESSES: Address[] = [
  {
    id: '1',
    name: '王小明',
    phone: '+886 9 1234 5678',
    address: '台北市信義區信義路五段 1 號',
    city: '台北市',
    isDefault: true,
  },
  {
    id: '2',
    name: '王小明',
    phone: '+886 9 8765 4321',
    address: '新北市板橋區中山路 100 號',
    city: '新北市',
    isDefault: false,
  },
];

export function Addresses() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">收貨地址</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-smooth font-medium">
          <Plus className="w-4 h-4" />
          新增地址
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ADDRESSES.map((address) => (
          <div key={address.id} className="rounded-lg border border-border p-6">
            <div className="flex justify-between">
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {address.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.phone}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  {address.address}
                </p>
                <p className="text-sm text-muted-foreground ml-8">
                  {address.city}
                </p>
              </div>

              {address.isDefault && (
                <div className="mb-4">
                  <span className="inline-block bg-secondary text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                    預設地址
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t border-border">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-smooth font-medium">
                <Edit2 className="w-4 h-4" />
                編輯
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-red-50 text-red-600 transition-smooth font-medium">
                <Trash2 className="w-4 h-4" />
                刪除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
