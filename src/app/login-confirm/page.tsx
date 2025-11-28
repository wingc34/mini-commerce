'use client';

import { trpc } from '@/trpc/client-api';
import { redirect } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

export default function LoginConfirmPage() {
  const { mutateAsync, error: createUserError } =
    trpc.auth.createUser.useMutation();

  const createUser = useCallback(async () => {
    const { success, message } = await mutateAsync();
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
      return;
    }
    redirect('http://localhost:3000/');
  }, [mutateAsync, toast]);

  useEffect(() => {
    createUser();
  }, []);

  return (
    <>
      <div className="mx-auto px-4 py-12 text-center text-3xl">Login...</div>
    </>
  );
}
