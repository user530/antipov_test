import React from 'react';
import styles from './Form-item.module.scss';

interface IFormItem {
    itemLabel: string;
    itemPlaceholder?: string;
    itemType?: 'text' | 'password';
    errHandling?: {
        validationCb: (value: string) => boolean;
        validationErr: string;
    }
};

export const FormItem: React.FC<IFormItem> = (props: IFormItem) => {
    const { itemLabel, itemType, itemPlaceholder, errHandling } = props;
    const [error, setError] = React.useState<boolean>(false);

    return (
        <div className={styles['form-item']}>
            <label className={styles['form-item__label']}>
                {itemLabel}
            </label>

            <input
                type={itemType ? itemType : 'text'}
                className={`${styles['form-item__input']}${error ? ' ' + styles['form-item__input--error'] : ''}`}
                placeholder={itemLabel ? itemPlaceholder : ''}
                onBlur={
                    errHandling
                        ? (e) => {
                            const isValid = errHandling?.validationCb(e.target.value);
                            setError(!isValid);
                        }
                        : () => { }
                }
            />

            {
                error
                    ? <span className={styles['form-item__error']}>
                        {errHandling?.validationErr ? errHandling.validationErr : ''}
                    </span>
                    : null
            }
        </div>
    )
}