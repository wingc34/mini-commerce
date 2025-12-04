'use client';

import { CartItem } from '@/components/cart/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';
import { useCart } from '@/store/cart-store';
import { Edit2, MapPin, MousePointer, ShoppingCart, Plus } from 'lucide-react';
import Link from 'next/link';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client-api';
import { toast } from 'sonner';
import {
  AddressModal,
  type AddressFormData,
} from '@/components/profile/addressModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Address {
  id: string;
  phone: string;
  city: string;
  country: string;
  fullName: string;
  line1: string;
  postal: string;
  isDefault: boolean;
}

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
}

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const [isPending, setIsPending] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');

  const {
    data,
    refetch,
    isFetching: isAddressesFetching,
  } = trpc.user.getUserAddresses.useQuery();
  const { mutateAsync: updateAddress, isPending: updateAddressPending } =
    trpc.user.updateUserAddress.useMutation();
  const addresses = data?.data as Address[];

  const selectedAddress =
    addresses?.find((item) => item.id === selectedAddressId) ??
    addresses?.find((item) => item.isDefault);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.sku.price * item.quantity,
    0
  );
  const isEmpty = items.length === 0;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const editingAddress = editingId
    ? addresses.find((a) => a.id === editingId)
    : undefined;

  const handleAddAddress = () => {
    setEditingId(null);
    setIsEditModalOpen(true);
  };

  const handleEditAddress = (id: string) => {
    setEditingId(id);
    setIsEditModalOpen(true);
  };
  const handleSelectedAddress = (id: string) => {
    setSelectedAddressId(id);
    setIsAddressModalOpen(false);
  };

  const handleSaveAddress = async (data: AddressFormData) => {
    const { success } = await updateAddress(data);
    if (success) {
      toast.success('Address saved successfully');
      refetch();
    } else {
      toast.error('Failed to save address');
      setIsEditModalOpen(true);
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="border-b border-border">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-textPrimary mb-2">
            Shopping Cart
          </h1>
        </div>
      </div>

      {isEmpty ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <ShoppingCart className="w-16 h-16 text-textSecondary" />
            </div>
            <h2 className="text-2xl font-bold text-textPrimary">
              Your Cart is Empty
            </h2>
            <p className="text-textSecondary max-w-md mx-auto">
              Start exploring our products and find items you love!
            </p>
            <Link
              href="/products"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-smooth"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <LoadingOverlay isLoading={isPending} className="w-full h-full" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="rounded-lg">
                {items?.map((item) => {
                  const attributes =
                    (item.sku.attributes as Record<string, string> | null) ??
                    {};
                  return (
                    <CartItem
                      key={`${item.id} ${item.sku.skuCode}`}
                      {...item}
                      image={item.image || 'https://placehold.co/600x400'}
                      price={item.sku.price}
                      sku={{
                        color: attributes['color'] ?? '',
                        size: attributes['size'] ?? '',
                      }}
                      onQuantityChange={(quantity) =>
                        updateQuantity(item.id, quantity)
                      }
                      onRemove={() => removeItem(item.sku.skuCode)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1 space-y-4">
              {selectedAddress ? (
                <div className="rounded-lg border border-border p-6">
                  <div className="flex justify-between">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">
                            {selectedAddress.fullName}
                          </p>
                          <p className="text-sm text-textSecondary">
                            {selectedAddress.phone}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-textSecondary ml-8">
                        {`${selectedAddress.line1}, ${selectedAddress.postal}`}
                      </p>
                      <p className="text-sm text-textSecondary ml-8">
                        {`${selectedAddress.city} ${selectedAddress.country}`}
                      </p>
                    </div>
                    {selectedAddress.isDefault && (
                      <div className="mb-4">
                        <span className="inline-block bg-secondary text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                          Default Address
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      variant={'outline'}
                      onClick={() => handleEditAddress(selectedAddress.id)}
                      className="flex-1 border-border transition-smooth font-medium cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant={'outline'}
                      onClick={() => setIsAddressModalOpen(true)}
                      className="flex-1 border-border transition-smooth font-medium cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                      Use Other Address
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => handleAddAddress()}
                  className="space-y-2 flex flex-col justify-center items-center rounded-lg border border-border p-6 mb-4 cursor-pointer hover:border-primary transition-smooth"
                >
                  <Plus className="w-8 h-8" />
                  <div>Add new address</div>
                </div>
              )}
              <CartSummary total={totalPrice} setIsPending={setIsPending} />
            </div>
          </div>
          <Dialog
            open={isAddressModalOpen}
            onOpenChange={setIsAddressModalOpen}
          >
            <DialogContent className="sm:max-w-[60%]">
              <DialogHeader>
                <DialogTitle>Address</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                {isAddressesFetching ? (
                  <LoadingOverlay isLoading={isAddressesFetching} />
                ) : (
                  addresses &&
                  (addresses.length > 0 ? (
                    <>
                      {addresses
                        .sort((a) => (a.isDefault ? -1 : 1))
                        .map((address) => (
                          <div
                            key={address.id}
                            className="rounded-lg border border-border p-6 mb-4 cursor-pointer hover:border-primary transition-smooth"
                            onClick={async () => {
                              await handleSaveAddress({
                                ...address,
                                isDefault: true,
                              });
                              setIsAddressModalOpen(false);
                            }}
                          >
                            <div className="flex justify-between">
                              <div className="space-y-2 mb-4">
                                <div className="flex items-start gap-3">
                                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                  <div>
                                    <p className="font-semibold text-foreground">
                                      {address.fullName}
                                    </p>
                                    <p className="text-sm text-textSecondary">
                                      {address.phone}
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm text-textSecondary ml-8">
                                  {`${address.line1}, ${address.postal}`}
                                </p>
                                <p className="text-sm text-textSecondary ml-8">
                                  {`${address.city} ${address.country}`}
                                </p>
                              </div>

                              {address.isDefault && (
                                <div className="mb-4">
                                  <span className="inline-block bg-secondary text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                                    Default Address
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant={'outline'}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditAddress(address.id);
                                }}
                                className="flex-1 transition-smooth font-medium cursor-pointer"
                              >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                              <Button
                                variant={'outline'}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectedAddress(address.id);
                                }}
                                className="flex-1 transition-smooth font-medium cursor-pointer"
                              >
                                <MousePointer className="w-4 h-4 mr-2" />
                                Select
                              </Button>
                            </div>
                          </div>
                        ))}
                      <div
                        onClick={() => handleAddAddress()}
                        className="space-y-2 flex flex-col justify-center items-center rounded-lg border border-border p-6 mb-4 cursor-pointer hover:border-primary transition-smooth"
                      >
                        <Plus className="w-8 h-8" />
                        <div>Add new address</div>
                      </div>
                    </>
                  ) : (
                    <div
                      onClick={() => handleAddAddress()}
                      className="space-y-2 flex flex-col justify-center items-center rounded-lg border border-border p-6 mb-4 cursor-pointer hover:border-primary transition-smooth"
                    >
                      <Plus className="w-8 h-8" />
                      <div>Add new address</div>
                    </div>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>
          <AddressModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveAddress}
            initialData={editingAddress}
            isEditing={!!editingId}
          />
        </div>
      )}
    </>
  );
}
