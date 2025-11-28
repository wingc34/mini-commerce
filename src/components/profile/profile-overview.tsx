import { Mail, Phone, MapPin, Calendar, Edit2 } from 'lucide-react';
import { trpc } from '@/trpc/client-api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import dayjs from 'dayjs';
import { Address } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface UserInfo {
  id: string;
  name: string;
  email: string;
  image: string;
  phone_number: string;
  addresses: Address[];
  createdAt: string;
  orderCount: number;
  orderAmount: number;
}

export function ProfileOverview({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  const { data: user } = trpc.user.getUserInfo.useQuery();
  const userInfo = user?.data as UserInfo;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">個人資訊</h2>
        <Button className="cursor-pointer" variant={'outline'}>
          <Edit2 className="w-4 h-4" />
          編輯
        </Button>
      </div>

      {/* Profile Card */}
      <div className="rounded-lg border border-border p-8">
        <div className="flex items-center gap-6 mb-8">
          {userInfo?.image && (
            <Avatar>
              <AvatarImage src={userInfo.image} alt="@shadcn" />
              <AvatarFallback>{userInfo.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          )}
          {userInfo?.name && (
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {userInfo.name}
              </h3>
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userInfo?.email && (
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="text-sm text-textSecondary mb-1">電子郵件</p>
                <p className="font-medium text-foreground">{userInfo.email}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div>
              <p className="text-sm text-textSecondary mb-1">電話號碼</p>
              {userInfo?.phone_number ? (
                <p className="font-medium text-foreground">
                  {userInfo.phone_number}
                </p>
              ) : (
                <p className="font-medium text-foreground">未填寫</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div>
              <p className="text-sm text-textSecondary mb-1">預設地址</p>
              {userInfo?.addresses.length > 0 ? (
                <p className="font-medium text-foreground">
                  {userInfo.addresses[0].city}
                </p>
              ) : (
                <Button
                  className="cursor-pointer"
                  onClick={() => setActiveTab('addresses')}
                >
                  新增地址
                </Button>
              )}
            </div>
          </div>

          {userInfo?.createdAt && (
            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="text-sm text-textSecondary mb-1">加入日期</p>
                <p className="font-medium text-foreground">
                  {dayjs(userInfo.createdAt).format('YYYY-MM-DD')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-200 rounded-lg p-6 border border-blue-200 dark:bg-blue-500">
          <p className="text-sm text-textPrimary mb-2">總訂單數</p>
          <p className="text-3xl font-bold text-textPrimary">
            {userInfo?.orderCount}
          </p>
        </div>
        <div className="bg-green-200 rounded-lg p-6 border border-green-200 dark:bg-green-500">
          <p className="text-sm text-textPrimary mb-2">總消費金額</p>
          <p className="text-3xl font-bold text-textPrimary">
            HKD${userInfo?.orderAmount}
          </p>
        </div>
      </div>
    </div>
  );
}
