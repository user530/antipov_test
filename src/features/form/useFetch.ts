import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeFetcher } from '../../common/api';
import { setUserToken } from './userSlice';
import { useAppDispatch } from '../../app/store/useStore';
import { PostLoginRes, PostRegisterRes } from '../../common/types'


export const useFetch = () => {
    const fetcherLogin = makeFetcher<PostLoginRes>();
    const fetcherRegister = makeFetcher<PostRegisterRes>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const BASEURL = process.env.REACT_APP_API_BASE_URL || 'https://reqres.in/api';
    const submitRegistration = React.useCallback(
        async (formData: { [key: string]: string }) => {
            const result = await fetcherRegister(`${BASEURL}/register`, formData);

            // Throw error for the form context to handle
            if (!result.success)
                throw new Error(result.error)

            // Redirect back to the login screen
            navigate(0);
        },
        [fetcherRegister, navigate]
    );

    const submitSignup = React.useCallback(
        async (formData: { [key: string]: string }) => {
            const result = await fetcherLogin(`${BASEURL}/login`, formData);

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
        [fetcherLogin, navigate, dispatch]
    );

    return {
        submitSignup,
        submitRegistration,
    }
}