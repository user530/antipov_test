import React, { ChangeEvent, FormEvent } from 'react';
import SingleInput from './Input';

interface ITestForm {
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

export const TestForm: React.FC<ITestForm> = (props: ITestForm) => {
    const { formName, btnText, submitHandler, formFields } = props;

    const defaultFormData = formFields.map(field => field.itemName).reduce((obj, key) => {
        (obj as any)[key] = '';
        return obj;
    }, {})

    const [formData, setFormData] = React.useState(defaultFormData);

    const handleChange = React.useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setFormData(
            (prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            })
        ), []
    );

    return (
        <form onSubmit={submitHandler}>
            <h1>{formName}</h1>
            {
                formFields.map(
                    ({ itemName, itemLabel, itemType, itemPlaceholder, itemValidation }, ind) => <SingleInput
                        key={itemName}
                        name={itemName}
                        handleChange={handleChange}
                        itemPlaceholder={itemPlaceholder}
                        itemValidation={itemValidation}
                    />
                )
            }
            <button type="submit">{btnText}</button>
        </form>
    )
}