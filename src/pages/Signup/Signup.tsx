import React from 'react';
import styles from './Signup.module.scss';
import { Form } from '../../features/form/Form';
import { FormItemProps } from '../../features/form/form-item/Form-item';
import { notemptyValidator, emailValidator, passwordValidator, formValidator } from '../../common/validators';
import { useFetch } from '../../features/form/useFetch';
import { useLocation } from 'react-router-dom';

export const Signup: React.FC = () => {
    const { submitRegistration, submitSignup } = useFetch();
    const location = useLocation();
    const [currentMode, setCurrentMode] = React.useState<'register' | 'signup'>('signup');

    // Commented out password validation for the regres
    const registerFormFields: FormItemProps[] = [
        {
            itemName: 'name',
            itemLabel: 'Имя',
            itemPlaceholder: 'Ваше имя',
            itemValidation: notemptyValidator,
        },
        {
            itemName: 'email',
            itemLabel: 'Электронная почта',
            itemType: 'email',
            itemPlaceholder: 'Ваш e-mail',
            itemValidation: emailValidator,
        },
        {
            itemName: 'password',
            itemLabel: 'Пароль',
            itemType: 'password',
            // itemValidation: passwordValidator,
        },
        {
            itemName: 'password2',
            itemLabel: 'Подтвердите пароль',
            itemType: 'password',
            // itemValidation: passwordValidator,
        },
    ]

    const loginFormFields: FormItemProps[] = [
        {
            itemName: 'email',
            itemLabel: 'Электронная почта',
            itemType: 'email',
            itemPlaceholder: 'Ваш e-mail',
            itemValidation: emailValidator,
        },
        {
            itemName: 'password',
            itemLabel: 'Пароль',
            itemType: 'password',
            itemValidation: notemptyValidator,
        },
    ]

    const toggleForm = () => setCurrentMode(current => current === 'register' ? 'signup' : 'register');

    return (
        <div className={styles['wrapper']}>
            {
                currentMode === 'signup'
                    ? (
                        <Form
                            key='signup'
                            formName='Вход'
                            btnText='Войти'
                            formFields={loginFormFields}
                            submitHandler={submitSignup}
                        />
                    )
                    : (
                        <Form
                            key='register'
                            formName='Регистрация'
                            btnText='Зарегистрироваться'
                            formFields={registerFormFields}
                            submitHandler={submitRegistration}
                            validateForm={formValidator}
                        />
                    )
            }

            <button className={styles['switch-form-btn']} onClick={toggleForm}>
                {currentMode === 'signup' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>
        </div>
    )
}