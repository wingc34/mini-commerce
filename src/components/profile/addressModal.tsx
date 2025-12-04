'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

export const AddressSchema = z.object({
  id: z.string().optional(),
  fullName: z.string().min(1, 'please enter your full name'),
  phone: z
    .string()
    .regex(/^\d{8}$/, 'please enter a valid 8-digit phone number'),
  city: z.string().min(1, 'please enter your city'),
  country: z.string().min(1, 'please enter your country'),
  line1: z.string().min(1, 'please enter your address'),
  postal: z
    .string()
    .regex(/^\d{6}$/, 'please enter a valid 6-digit postal code'),
  isDefault: z.boolean().default(false),
});

export type AddressFormData = z.infer<typeof AddressSchema>;

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddressFormData) => void;
  initialData?: AddressFormData;
  isEditing?: boolean;
}

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
    setValue,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = form;

  React.useEffect(() => {
    reset(defaultValues);
  }, [initialData, reset, isOpen]);

  const onSubmit: SubmitHandler<AddressFormData> = (data) => {
    onSave(data);
    reset(defaultValues);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Address' : 'Add Address'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter full name"
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="grid gap-2">
            <Label htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              placeholder="e.g. 12348765"
              {...register('phone')}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* City */}
          <div className="grid gap-2">
            <Label htmlFor="city">
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              placeholder="Enter city name"
              {...register('city')}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">
              Country <span className="text-red-500">*</span>
            </Label>
            <Input
              id="country"
              placeholder="Enter country name"
              {...register('country')}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="grid gap-2">
            <Label htmlFor="address">
              Address <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="address"
              placeholder="Enter your address"
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
              Postal Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="postalCode"
              placeholder="e.g. 123456"
              {...register('postal')}
            />
            {errors.postal && (
              <p className="text-red-500 text-sm">{errors.postal.message}</p>
            )}
          </div>

          {/* Default Address */}
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="isDefault"
              checked={watch('isDefault')}
              onCheckedChange={(checked) =>
                setValue('isDefault', !!checked, { shouldValidate: true })
              }
              disabled={initialData?.isDefault ? true : false}
            />
            <Label
              htmlFor="isDefault"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Set as default shipping address
            </Label>
          </div>

          <DialogFooter className="pt-6 sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              {isSubmitting ? 'Loading...' : isEditing ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
