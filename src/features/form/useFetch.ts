import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeFetcher } from '../../common/api';

export const useFetch = () => {
    const fetcher = makeFetcher();
    const navigate = useNavigate();

    const submitRegistration = React.useCallback(
        async (formData: { [key: string]: string }) => {
            console.log('FORM - SUBMIT REGISTRATION FORM!');
            console.log(formData);
            const result = await fetcher('https://reqres.in/api/register', formData);

            // Throw error for the form context to handle
            if (!result.success)
                throw new Error(result.error)

            // SET LOGIN DATA?
            console.log('SUBMIT RESULT'); console.log(result.data);
            // Redirect back to the login screen
            navigate(0);
        },
        [fetcher, navigate]
    );

    const submitSignup = React.useCallback(
        async (formData: { [key: string]: string }) => {
            console.log('FORM - SUBMIT SIGNUP FORM!');
            console.log(formData);
            const result = await fetcher('https://reqres.in/api/login', formData);

            // Throw error for the form context to handle
            if (!result.success)
                throw new Error(result.error)

            // SET LOGIN DATA
            console.log('SUBMIT RESULT'); console.log(result.data);
            // Move to the main content
            navigate('/catalogue');
        },
        [fetcher, navigate]
    );

    return {
        submitSignup,
        submitRegistration,
    }
}