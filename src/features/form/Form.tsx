import React from 'react';
import styles from './Form.module.scss';
import { FormItem } from './form-item/Form-item';

interface IFormComponent {
    formName: string;
}

export const Form: React.FC<IFormComponent> = (props: IFormComponent) => {
    const { formName } = props;

    return (
        <form className={styles['form__wrapper']}>
            <div className={styles['form__heading']}>
                <h2 className={styles['form__heading-title']}>{formName}</h2>
            </div>

            <div className={styles['form__body']}>
                <FormItem itemLabel='Имя' itemPlaceholder='Ваше имя' />
                <FormItem itemLabel='Электронная почта' itemPlaceholder='Ваш e-mail' />
                <FormItem itemLabel='Пароль' itemType='password' isError={true} />
                <FormItem itemLabel='Подтвердите пароль' itemType='password' />
            </div>

            <div className={styles['form__footer']}>
                <input type="submit" value="" />
            </div>
        </form>
    );
} 