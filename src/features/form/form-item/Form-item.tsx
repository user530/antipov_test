import React from 'react';
import styles from './Form-item.module.scss';

interface IFormItem {
    itemLabel: string;
    itemPlaceholder?: string;
    itemType?: 'text' | 'password';
    isError?: boolean;
};

export const FormItem: React.FC<IFormItem> = (props: IFormItem) => {
    const { itemLabel, itemType, itemPlaceholder, isError } = props;
    const [error, setError] = React.useState<boolean>(isError ? isError : false);

    return (
        <div className={styles['form-item']}>
            <label className={styles['form-item__label']}>
                {itemLabel}
            </label>

            <input
                type={itemType ? itemType : 'text'}
                className={`${styles['form-item__input']}${error ? ' ' + styles['form-item__input--error'] : ''}`}
                placeholder={itemLabel ? itemPlaceholder : ''}
            />

            {error
                ? <span className={styles['form-item__error']}>Ошибка</span>
                : null
            }
        </div>
    )
}