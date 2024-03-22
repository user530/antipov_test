import React from 'react';
import styles from './Signup.module.scss';
import { Form } from '../../features/form/Form';
import { FormItemProps } from '../../features/form/form-item/Form-item';
import { nameValidator, emailValidator, passwordValidator, formValidator } from '../../common/validators';
import { submitHandler } from '../../common/api';

export const Signup: React.FC = () => {

    const registerFormFields: FormItemProps[] = [
        {
            itemName: 'name',
            itemLabel: 'Имя',
            itemPlaceholder: 'Ваше имя',
            itemValidation: nameValidator,
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

    return (
        <div className={styles['wrapper']}>
            <Form
                formName='Регистрация'
                btnText='Зарегистрироваться'
                formFields={registerFormFields}
                submitHandler={submitHandler}
                validateForm={formValidator}
            />
        </div>
    )
}