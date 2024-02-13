import React, { ChangeEvent } from 'react';
import styles from './Form-item.module.scss';

interface IFormItem {
    itemName: string;
    itemType?: 'text' | 'password';
    itemValue: string;
    itemLabel: string;
    itemPlaceholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    errHandling?: {
        validationCb: (value: string) => boolean;
        validationErr: string;
    }
};

export const FormItem: React.FC<IFormItem> = (props: IFormItem) => {
    const { itemName, itemValue, itemLabel, itemType, itemPlaceholder, errHandling, onChange } = props;
    const [error, setError] = React.useState<boolean>(false);

    console.log(`Form Item ${itemName} fired!`);

    return (
        <div className={styles['form-item']}>
            <label className={styles['form-item__label']}>
                {itemLabel}
            </label>

            <input
                type={itemType ? itemType : 'text'}
                className={`${styles['form-item__input']}${error ? ' ' + styles['form-item__input--error'] : ''}`}
                name={itemName}
                value={itemValue}
                placeholder={itemPlaceholder ? itemPlaceholder : ''}
                onChange={(e) => onChange(e)}
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