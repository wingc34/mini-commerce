'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setToken } from '@/lib/auth';

export default function LoginConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setToken(token);
      router.push('/');
    } else {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <div className="mx-auto px-4 py-12 text-center text-3xl">Login...</div>
    </>
  );
}
