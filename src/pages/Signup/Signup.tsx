import React from 'react';
import styles from './Signup.module.scss';
import { Form } from '../../features/form/Form';
import { FormItemProps } from '../../features/form/form-item/Form-item';
import { notemptyValidator, emailValidator, passwordValidator, formValidator } from '../../common/validators';
import { submitRegistration, submitSignup } from '../../common/api';

export const Signup: React.FC = () => {

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
            itemValidation: passwordValidator,
        },
        {
            itemName: 'password2',
            itemLabel: 'Подтвердите пароль',
            itemType: 'password',
            itemValidation: passwordValidator,
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

    return (
        <div className={styles['wrapper']}>
            <Form
                formName='Вход'
                btnText='Войти'
                formFields={loginFormFields}
                submitHandler={submitSignup}
            />
            {/* <Form
                formName='Регистрация'
                btnText='Зарегистрироваться'
                formFields={registerFormFields}
                submitHandler={submitRegistration}
                validateForm={formValidator}
            /> */}
        </div>
    )
}