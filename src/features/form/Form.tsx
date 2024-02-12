import React from 'react';
import styles from './Form.module.scss';
import { FormItem } from './form-item/Form-item';

interface IFormComponent {
    formName: string;
    btnText: string;
}

export const Form: React.FC<IFormComponent> = (props: IFormComponent) => {
    const { formName, btnText } = props;

    return (
        <form className={styles['form__wrapper']}>
            <div className={styles['form__heading']}>
                <h2 className={styles['form__heading-title']}>{formName}</h2>
            </div>

            <div className={styles['form__body']}>
                <FormItem itemLabel='Имя' itemPlaceholder='Ваше имя' />
                <FormItem itemLabel='Электронная почта' itemPlaceholder='Ваш e-mail' />
                <FormItem itemLabel='Пароль' itemType='password'
                    errHandling={{
                        validationCb: (val) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/.test(val),
                        validationErr: 'Пароль должен быть не меньше 6 символов и включать одну цифру, одну заглавную и малую буквы, а также один спец символ!'
                    }} />
                <FormItem itemLabel='Подтвердите пароль' itemType='password' />
            </div>

            <div className={styles['form__footer']}>
                <input className={styles['button']} type="submit" value={btnText} />
            </div>
        </form>
    );
} 