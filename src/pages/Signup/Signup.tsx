import React from 'react';
import styles from './Signup.module.scss';
import { Form } from '../../features/form/Form';
import { FormItemProps } from '../../features/form/form-item/Form-item';

export const Signup: React.FC = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
    const nameValidator = (value: string) => !(value.length > 0) ? 'Имя не должно быть пустым полем' : null;
    const emailValidator = (value: string) => !emailRegex.test(value) ? 'Некорректный формат электронной почты' : null;
    const passwordValidator = (value: string) => !passwordRegex.test(value)
        ? 'Пароль должен быть не меньше 6 символов и включать одну цифру, одну заглавную и малую буквы, а также один спец символ!' : null;

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
                submitHandler={(e) => {
                    console.log('FORM - SUBMIT FORM!');
                    console.log(e);
                }}
                validateForm={(formData) => {
                    console.log('FORM - VALIDATE FORM!');
                    return {}
                }

                }
            />
        </div>
    )
}