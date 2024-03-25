import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/store/useStore';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { userToken } = useAppSelector(state => state.reducer.user);

    if (!userToken)
        return <Navigate to='/signup' replace />

    return <>{children}</>;
}