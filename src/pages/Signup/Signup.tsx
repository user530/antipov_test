import React from 'react';
import styles from './Signup.module.scss';
import { Form } from '../../features/form/Form';
import { TestForm } from '../../features/test/FormTest';

interface FormItemData {
    itemName: string;
    itemType: 'text' | 'password';
    itemLabel: string;
    itemPlaceholder?: string;
    itemValidation?: {
        validationCb: (value: string) => boolean;
        validationErr: string;
    }
}

export const Signup: React.FC = () => {
    const registerFormFields: FormItemData[] = [
        {
            itemName: 'name',
            itemType: 'text',
            itemLabel: 'Имя',
            itemPlaceholder: 'Ваше имя',
        },
        {
            itemName: 'email',
            itemType: 'text',
            itemLabel: 'Электронная почта',
            itemPlaceholder: 'Ваш e-mail',
        },
        {
            itemName: 'password',
            itemType: 'password',
            itemLabel: 'Пароль',
            itemValidation:
            {
                validationCb: (val) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/.test(val),
                validationErr: 'Пароль должен быть не меньше 6 символов и включать одну цифру, одну заглавную и малую буквы, а также один спец символ!'
            }
        },
        {
            itemName: 'password2',
            itemType: 'password',
            itemLabel: 'Подтвердите пароль',
        },
    ]

    return (
        <div className={styles['wrapper']}>
            {/* <Form
                formName='Регистрация'
                btnText='Зарегистрироваться'
                formFields={registerFormFields}
                submitHandler={(e) => {
                    console.log('SUBMIT FORM FIRED!');
                    const form = e.target as HTMLFormElement;
                    const data = new FormData(form);
                }} /> */}
            <TestForm
                formName='Регистрация'
                btnText='Зарегистрироваться'
                formFields={registerFormFields}
                submitHandler={(e) => {
                    e.preventDefault();
                    console.log('SUBMIT FORM FIRED!');
                    const form = e.target as HTMLFormElement;
                    const data = new FormData(form);
                    console.log(Array.from(data))
                }}
            />
        </div>
    )
}