import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/store/useStore';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { userId } = useAppSelector(state => state.reducer.user);

    if (!userId)
        return <Navigate to='/' replace />

    return <>{children}</>;
}