import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit2, MapPin, MousePointer, Plus } from 'lucide-react';
import { Address } from '@/app/cart/type';

interface SelectAddressModalProps {
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (isOpen: boolean) => void;
  addresses: Address[];
  handleAddAddress: () => void;
  handleEditAddress: (id: string) => void;
  handleSaveAddress: (data: Address) => Promise<void>;
  handleSelectedAddress: (id: string) => void;
}

export function SelectAddressModal({
  isAddressModalOpen,
  setIsAddressModalOpen,
  addresses,
  handleAddAddress,
  handleEditAddress,
  handleSaveAddress,
  handleSelectedAddress,
}: SelectAddressModalProps) {
  return (
    <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
      <DialogContent className="sm:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>Address</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {addresses &&
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
                            <span className="inline-block bg-secondary text-gray-900 px-3 py-1 rounded-full text-xs font-semibold text-center">
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
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
