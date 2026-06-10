'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';
import { useCurrentUser } from '../hooks/useCurrentUser';

export default function AppInitializer() {
  const dispatch = useDispatch();

  const { data } = useCurrentUser();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  return null;
}
