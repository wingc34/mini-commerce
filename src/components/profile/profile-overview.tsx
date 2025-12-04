'use client';

import { Mail, Phone, MapPin, Calendar, Edit2 } from 'lucide-react';
import { trpc } from '@/trpc/client-api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import dayjs from 'dayjs';
import { Address } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import _ from 'lodash';
import { z, type ZodError } from 'zod';
import { Label } from '../ui/label';
import { LoadingOverlay } from '../ui/LoadingOverlay';

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
  const { data: user, isFetching: userInfoFetching } =
    trpc.user.getUserInfo.useQuery();
  const userInfo = user?.data as UserInfo;
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userInfo?.name);
  const [nameError, setNameError] = useState('');
  const nameSchema = z
    .string()
    .max(64, 'please do not exceed 64 characters')
    .min(1, 'cannot be empty');
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phone_number);
  const [phoneError, setPhoneError] = useState('');
  const phoneNumberSchema = z
    .string()
    .regex(/^\d{8}$/, 'please enter a valid 8-digit phone number');
  const onNameInput = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const result = nameSchema.safeParse(name);
    if (result.success) {
      setName(e.target.value);
      setNameError('');
    } else {
      const json = JSON.parse(result.error.message) as ZodError[];
      setNameError(json[0].message);
    }
  });
  const onPhoneInput = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    const result = phoneNumberSchema.safeParse(phone);
    if (result.success) {
      setPhoneNumber(e.target.value);
      setPhoneError('');
    } else {
      const json = JSON.parse(result.error.message) as ZodError[];
      setPhoneError(json[0].message);
    }
  });

  const {
    mutate: updateUserInfo,
    isSuccess,
    isPending: updateUserInfoPending,
  } = trpc.user.updateUserInfo.useMutation();
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setName(userInfo?.name ?? '');
    setPhoneNumber(userInfo?.phone_number ?? '');
  }, [userInfo]);

  useEffect(() => {
    if (isSuccess) {
      setUpdated(false);
    }
  }, [isSuccess]);

  return (
    <>
      <LoadingOverlay
        isLoading={userInfoFetching || updateUserInfoPending}
        className="w-full h-full"
      />
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Personal Information
        </h2>
        {isEditing ? (
          <Button
            className="cursor-pointer"
            onClick={() => {
              if (nameError || phoneError) return;
              setIsEditing(false);
              setUpdated(true);
              updateUserInfo({
                name,
                phone_number: phoneNumber,
              });
            }}
          >
            Save
          </Button>
        ) : (
          <Button
            className="cursor-pointer"
            variant={'outline'}
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
        )}
      </div>

      {/* Profile Card */}
      <div className="rounded-lg border border-border p-8 relative">
        <LoadingOverlay isLoading={updated && !isSuccess} />
        <div className="flex items-center gap-6 mb-8">
          {userInfo?.image && (
            <Avatar>
              <AvatarImage src={userInfo.image} alt="avatar" />
              <AvatarFallback>
                {name ? name.substring(0, 2) : ''}
              </AvatarFallback>
            </Avatar>
          )}
          {isEditing ? (
            <div className="flex flex-col w-full">
              <Input defaultValue={name} onInput={onNameInput} />
              <Label className="text-red-500 mt-2">{nameError}</Label>
            </div>
          ) : (
            name && (
              <div>
                <h3 className="text-2xl font-bold text-foreground">{name}</h3>
              </div>
            )
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userInfo?.email && (
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="text-sm text-textSecondary mb-1">Email</p>
                <p className="font-medium text-foreground">{userInfo.email}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div>
              <p className="text-sm text-textSecondary mb-1">Phone Number</p>
              {isEditing ? (
                <div className="flex flex-col">
                  <Input
                    defaultValue={phoneNumber ?? ''}
                    onInput={onPhoneInput}
                  />
                  <Label className="text-red-500 mt-2">{phoneError}</Label>
                </div>
              ) : phoneNumber ? (
                <p className="font-medium text-foreground">{phoneNumber}</p>
              ) : (
                <p className="font-medium text-foreground">Unfilled</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div>
              <p className="text-sm text-textSecondary mb-1">Default Address</p>
              {userInfo && userInfo?.addresses.length > 0 ? (
                <>
                  <p className="font-semibold text-textPrimary">
                    {userInfo.addresses[0].fullName}
                  </p>
                  <p className="text-sm text-textPrimary">
                    {userInfo.addresses[0].phone}
                  </p>
                  <p className="text-sm text-textPrimary">
                    {`${userInfo.addresses[0].line1}, ${userInfo.addresses[0].postal}`}
                  </p>
                  <p className="text-sm text-textPrimary">
                    {`${userInfo.addresses[0].city} ${userInfo.addresses[0].country}`}
                  </p>
                </>
              ) : (
                <Button
                  className="cursor-pointer"
                  onClick={() => setActiveTab('addresses')}
                >
                  Add Address
                </Button>
              )}
            </div>
          </div>

          {userInfo?.createdAt && (
            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="text-sm text-textSecondary mb-1">Join Date</p>
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
          <p className="text-sm text-textPrimary mb-2">Total Orders</p>
          <p className="text-3xl font-bold text-textPrimary">
            {userInfo?.orderCount}
          </p>
        </div>
        <div className="bg-green-200 rounded-lg p-6 border border-green-200 dark:bg-green-500">
          <p className="text-sm text-textPrimary mb-2">Total Spent</p>
          <p className="text-3xl font-bold text-textPrimary">
            HKD${userInfo?.orderAmount}
          </p>
        </div>
      </div>
    </>
  );
}
