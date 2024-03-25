import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeFetcher } from '../../common/api';
import { setUserId, setUserToken } from './userSlice';
import { useAppDispatch } from '../../app/store/useStore';

export const useFetch = () => {
    const fetcher = makeFetcher();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const submitRegistration = React.useCallback(
        async (formData: { [key: string]: string }) => {
            const result = await fetcher('https://reqres.in/api/register', formData);

            // Throw error for the form context to handle
            if (!result.success)
                throw new Error(result.error)

            // Redirect back to the login screen
            navigate(0);
        },
        [fetcher, navigate]
    );

    const submitSignup = React.useCallback(
        async (formData: { [key: string]: string }) => {
            const result = await fetcher('https://reqres.in/api/login', formData);

            // Throw error for the form context to handle
            if (!result.success)
                throw new Error(result.error)

            const { token } = result.data;

            // Set login data
            dispatch(setUserToken(token));
            localStorage.setItem('token', token);

            // Move to the main content
            navigate('/');
        },
        [fetcher, navigate, dispatch]
    );

    return {
        submitSignup,
        submitRegistration,
    }
}