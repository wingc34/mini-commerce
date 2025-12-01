import { trpc } from '@/trpc/client-api';
import { MapPin, Edit2, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AddressModal,
  type AddressFormData,
} from '@/components/profile/addressModal';
import { useState } from 'react';

export interface Address {
  id: string;
  phone: string;
  city: string;
  country: string;
  fullName: string;
  line1: string;
  postal: string;
  isDefault: boolean;
}

export function Addresses() {
  const { data, refetch } = trpc.user.getUserAddresses.useQuery();
  const { mutateAsync: updateAddress } =
    trpc.user.updateUserAddress.useMutation();
  const { mutateAsync: deleteAddress } =
    trpc.user.deleteUserAddress.useMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addresses = data?.data as Address[];
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingAddress = editingId
    ? addresses.find((a) => a.id === editingId)
    : undefined;

  const handleAddAddress = () => {
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEditAddress = (id: string) => {
    setEditingId(id);
    setIsModalOpen(true);
  };

  const handleDeleteddress = async (id: string) => {
    const { success } = await deleteAddress({ id });
    if (success) {
      refetch();
    }
  };

  const handleSaveAddress = async (data: AddressFormData) => {
    const { success } = await updateAddress(data);
    if (success) {
      refetch();
    }
  };

  if (!data) {
    return null;
  }
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">收貨地址</h2>
          <Button
            onClick={() => handleAddAddress()}
            className="flex items-center gap-2 px-4 py-2  text-white rounded-lg transition-smooth font-medium cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            新增地址
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses
            .sort((a) => (a.isDefault ? -1 : 1))
            .map((address) => (
              <div
                key={address.id}
                className="rounded-lg border border-border p-6"
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
                        預設地址
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    variant={'outline'}
                    onClick={() => handleEditAddress(address.id)}
                    className="flex-1 border-border transition-smooth font-medium cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                    編輯
                  </Button>
                  <Button
                    variant={'outline'}
                    onClick={() => handleDeleteddress(address.id)}
                    className="flex-1 border-border hover:bg-red-50 text-red-600 transition-smooth font-medium cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    刪除
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAddress}
        initialData={editingAddress}
        isEditing={!!editingId}
      />
    </>
  );
}
