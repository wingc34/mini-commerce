'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// 引入 shadcn/ui 元件
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
// 移除了 Select 相關的導入

// --- 1. 定義 Schema 和 Type ---

// 1.1 Zod 驗證 Schema (錯誤訊息已更新為「輸入」)
export const AddressSchema = z.object({
  id: z.string().optional(),
  fullName: z.string().min(1, '請輸入姓名'),
  phone: z.string().regex(/^\d{8}$/, '請輸入正確的8位手機號碼'),
  city: z.string().min(1, '請輸入縣市'),
  country: z.string().min(1, '請輸入國家'),
  line1: z.string().min(1, '請輸入完整地址'),
  postal: z.string().regex(/^\d{6}$/, '請輸入6位郵遞區號'),
  isDefault: z.boolean().default(false),
});

// 1.2 導出 TypeScript 型別
export type AddressFormData = z.infer<typeof AddressSchema>;

// --- 2. 元件 Props 定義 ---

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddressFormData) => void;
  initialData?: AddressFormData;
  isEditing?: boolean;
}

// --- 3. AddressModal 元件 ---

export function AddressModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditing,
}: AddressModalProps) {
  const defaultValues: AddressFormData = initialData || {
    fullName: '',
    phone: '',
    line1: '',
    city: '',
    country: '',
    postal: '',
    isDefault: false,
  };

  const form = useForm({
    resolver: zodResolver(AddressSchema),
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  const {
    register,
    handleSubmit,
    setValue, // setValue 仍然保留，因為 Checkbox 會使用到
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = form;

  // 當 Modal 開啟或 initialData 改變時，重設表單狀態
  React.useEffect(() => {
    reset(defaultValues);
  }, [initialData, reset, isOpen]);

  // 處理表單提交
  const onSubmit: SubmitHandler<AddressFormData> = (data) => {
    onSave(data);
    reset(defaultValues);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? '編輯地址' : '新增地址'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">
              姓名 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="請輸入姓名"
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="grid gap-2">
            <Label htmlFor="phone">
              電話 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              placeholder="例：+886 9 1234 5678"
              {...register('phone')}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* City (已更改為 Input) */}
          <div className="grid gap-2">
            <Label htmlFor="city">
              縣市 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              placeholder="請輸入縣市名稱 (例: 台北市)"
              {...register('city')} // <--- 使用 register 綁定
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">
              國家 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="country"
              placeholder="請輸入縣市名稱 (例: 台北市)"
              {...register('country')} // <--- 使用 register 綁定
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="grid gap-2">
            <Label htmlFor="address">
              地址 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="address"
              placeholder="請輸入完整地址"
              rows={3}
              {...register('line1')}
            />
            {errors.line1 && (
              <p className="text-red-500 text-sm">{errors.line1.message}</p>
            )}
          </div>

          {/* Postal Code */}
          <div className="grid gap-2">
            <Label htmlFor="postalCode">
              郵遞區號 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="postalCode"
              placeholder="例：10001"
              {...register('postal')}
            />
            {errors.postal && (
              <p className="text-red-500 text-sm">{errors.postal.message}</p>
            )}
          </div>

          {/* Default Address (Checkbox 仍使用 setValue) */}
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="isDefault"
              checked={watch('isDefault')}
              onCheckedChange={(checked) =>
                setValue('isDefault', !!checked, { shouldValidate: true })
              }
            />
            <Label
              htmlFor="isDefault"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              設為預設收貨地址
            </Label>
          </div>

          <DialogFooter className="pt-6 sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={onClose}>
                取消
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              {isSubmitting ? '儲存中...' : isEditing ? '更新地址' : '新增地址'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
