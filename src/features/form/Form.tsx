import React from 'react';
import styles from './Form.module.scss';
import { FormItem, FormItemProps } from './form-item/Form-item';
import { FormProvider, useFormContext } from './Form.context';

interface FormContentProps {
    formName: string;
    formFields: FormItemProps[];
    btnText: string;
}

interface FormProps extends FormContentProps {
    submitHandler: (values: { [key: string]: any }) => void;
    validateForm: (values: { [key: string]: any }) => { [key: string]: string }
}

const FormContent: React.FC<FormContentProps> = (props: FormContentProps) => {
    const { handleSubmit } = useFormContext();
    const { btnText, formFields, formName } = props;

    return (
        <form className={styles['form__wrapper']} onSubmit={handleSubmit}>
            <div className={styles['form__heading']}>
                <h2 className={styles['form__heading-title']}>{formName}</h2>
            </div>

            <div className={styles['form__body']}>
                {
                    formFields.map(
                        (fieldProps, ind) => <FormItem key={ind} {...fieldProps} />
                    )
                }
            </div>

            <div className={styles['form__footer']}>
                <input className={styles['button']} type="submit" value={btnText} />
            </div>
        </form>
    )

}

export const Form: React.FC<FormProps> = (props: FormProps) => {
    const { submitHandler, validateForm, ...contentProps } = props;

    return (
        <FormProvider onSubmit={submitHandler} validateForm={validateForm}>
            <FormContent {...contentProps} />
        </FormProvider>
    );
} 