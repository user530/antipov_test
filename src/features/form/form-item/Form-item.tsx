import React from 'react';
import styles from './Form-item.module.scss';
import { useFormContext } from '../Form.context';
import { FiEye, FiEyeOff } from "react-icons/fi";

export interface FormItemProps {
    itemName: string;
    itemLabel: string;
    itemPlaceholder?: string;
    itemType?: string;
    itemValidation?: (value: any) => string | null;
};

export const FormItem: React.FC<FormItemProps> = (props: FormItemProps) => {
    const { itemName, itemLabel, itemType, itemPlaceholder, itemValidation } = props;
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

    const formItemProps = {
        itemName,
        itemPlaceholder,
        itemValue,
        itemError,
        changeHandler,
        blurHandler,
    }

    return (
        <div className={styles['form-item']}>
            <label className={styles['form-item__label']}>
                {itemLabel}
            </label>

            {
                itemType === 'password'
                    ? <PasswordFormItem {...formItemProps} />
                    : <GenericFormItem {...formItemProps} itemType={itemType} />
            }

            {
                itemError
                    ? <span className={styles['form-item__error']}>{itemError}</span>
                    : null
            }
        </div>
    )
}

interface FormInputProps extends Omit<FormItemProps, 'itemLabel' | 'itemValidation'> {
    itemValue: string;
    itemError: string;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    blurHandler: () => void;
}

const GenericFormItem: React.FC<FormInputProps> = (props) => {
    const { itemName, itemType, itemPlaceholder, itemValue, itemError, changeHandler, blurHandler } = props;

    return (
        <input
            type={itemType ? itemType : 'text'}
            className={`${styles['form-item__input']}${itemError ? ' ' + styles['form-item__input--error'] : ''}`}
            name={itemName}
            value={itemValue}
            placeholder={itemPlaceholder ? itemPlaceholder : ''}
            onChange={changeHandler}
            onBlur={blurHandler}
        />
    )
}

interface PasswordInputProps extends Omit<FormInputProps, 'itemType'> { }

const PasswordFormItem: React.FC<PasswordInputProps> = (props) => {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    const iconClickHandler = () => {
        setIsVisible(current => !current);
    };

    return (
        <div className={styles['form-item__input-wrapper']}>
            <GenericFormItem
                itemType={isVisible ? 'text' : 'password'}
                {...props}
            />

            <button className={styles['form-item__visibility']} onClick={iconClickHandler} >
                {
                    isVisible
                        ? <FiEye />
                        : <FiEyeOff />
                }
            </button>
        </div>
    )
}
