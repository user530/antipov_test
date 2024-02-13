import React, { ChangeEvent, FormEvent } from 'react';
import styles from './Form.module.scss';
import { FormItem } from './form-item/Form-item';

interface IFormComponent {
    formName: string;
    formFields: FormItemData[];
    btnText: string;
    submitHandler: (e: FormEvent<HTMLFormElement>) => void;
}

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

export const Form: React.FC<IFormComponent> = (props: IFormComponent) => {
    const { formName, btnText, formFields, submitHandler } = props;

    const [formData, setFormData] = React.useState<any>({});

    const handleChange = (fieldName: string, e: ChangeEvent<HTMLInputElement>) => {
        setFormData(
            (prev: any) => ({
                ...prev,
                [fieldName]: e.target.value,
            })
        )
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitHandler(e);
    }

    return (
        <form className={styles['form__wrapper']} onSubmit={handleSubmit}>
            <div className={styles['form__heading']}>
                <h2 className={styles['form__heading-title']}>{formName}</h2>
            </div>

            <div className={styles['form__body']}>
                {
                    formFields.map(
                        ({ itemLabel, itemType, itemName, itemPlaceholder, itemValidation }, ind) => <FormItem
                            key={ind}
                            itemLabel={itemLabel}
                            itemType={itemType}
                            itemName={itemName}
                            itemValue={formData[itemName] || ''}
                            onChange={(e) => handleChange(itemName, e)}
                            errHandling={itemValidation}
                            itemPlaceholder={itemPlaceholder}
                        />
                    )}
            </div>

            <div className={styles['form__footer']}>
                <input className={styles['button']} type="submit" value={btnText} />
            </div>
        </form>
    );
} 