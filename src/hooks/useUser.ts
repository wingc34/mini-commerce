import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export interface UpdateUserInput {
  name?: string | null;
  phoneNumber?: string | null;
}

export function useUser() {
  const updateMe = useMutation({
    mutationFn: (data: UpdateUserInput) => api.patch('/api/v1/users/me', data),
  });

  return { updateMe };
}
