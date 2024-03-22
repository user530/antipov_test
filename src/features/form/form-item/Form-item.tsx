import React from 'react';
import styles from './Form-item.module.scss';
import { useFormContext } from '../Form.context';

export interface FormItemProps {
    itemName: string;
    itemLabel: string;
    itemPlaceholder?: string;
    itemType?: string;
    itemValidation?: (value: any) => string | null;
};

export const FormItem: React.FC<FormItemProps> = (props: FormItemProps) => {
    const { itemName, itemLabel, itemPlaceholder, itemType, itemValidation } = props;
    const { formValues, formErrors, handleChange, setFieldError, clearFieldError } = useFormContext();

    const itemValue = formValues[itemName];
    const itemError = formErrors[itemName];

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(itemName, e.target.value);
    };

    const blurHandler = () => {
        if (!itemValidation) return;

        const validationError: string | null = itemValidation(itemValue);

        if (!validationError)
            clearFieldError(itemName);
        else
            setFieldError(itemName, validationError);
    };

    return (
        <div className={styles['form-item']}>
            <label className={styles['form-item__label']}>
                {itemLabel}
            </label>

            <input
                type={itemType ? itemType : 'text'}
                className={`${styles['form-item__input']}${itemError ? ' ' + styles['form-item__input--error'] : ''}`}
                name={itemName}
                value={itemValue}
                placeholder={itemPlaceholder ? itemPlaceholder : ''}
                onChange={changeHandler}
                onBlur={blurHandler}
            />

            {
                itemError
                    ? <span className={styles['form-item__error']}>{itemError}</span>
                    : null
            }
        </div>
    )
}