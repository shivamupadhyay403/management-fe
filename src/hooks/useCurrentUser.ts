// hooks/useCurrentUser.ts

import { useQuery } from '@tanstack/react-query';
import { me } from '../services/auth.service';

export const useCurrentUser = () =>
  useQuery({
    queryKey: ['current-user'],
    queryFn: me,
    retry: false,
  });
