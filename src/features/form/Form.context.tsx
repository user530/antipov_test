import React from 'react';
import { FormItemProps } from './form-item/Form-item';
import { Loader } from '../loader/Loader';

interface IFormContext {
    formValues: { [key: string]: any };
    formErrors: { [key: string]: string };
    handleChange: (field: string, value: any) => void;
    handleSubmit: (e: React.FormEvent) => void;
    setFieldError: (field: string, message: string) => void;
    clearFieldError: (field: string) => void;
}

// Prepare context
const FormContext = React.createContext<IFormContext | null>(null);

export const useFormContext = () => {
    const formContext = React.useContext(FormContext);

    if (!formContext)
        throw new Error('Use Form Context must me called from the correct provider!');

    return formContext;
}

interface FormProviderProps {
    children: React.ReactNode;
    onSubmit: (values: { [key: string]: any }) => Promise<void>;
    validateForm?: (values: { [key: string]: any }) => { [key: string]: string };
}

export const FormProvider: React.FC<FormProviderProps> = ({ children, onSubmit, validateForm }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // Prepare default object that stores all form input names with empty values
    const formItemsObj: { [key: string]: string } = {};

    // Prepare a list of field validators
    const formItemValidators: { [key: string]: (value: string) => string | null } = {};

    // Populate formItemsObj
    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return [];

        const fieldProps: FormItemProps[] = child.props?.formFields;

        fieldProps.reduce(
            (defaultFieldObj, prop) => {
                defaultFieldObj[prop.itemName] = '';
                // Add a validation to the validation object
                if (prop.itemValidation) formItemValidators[prop.itemName] = prop.itemValidation;

                return defaultFieldObj
            },
            formItemsObj
        )
    })

    // Form values and errors
    const [formValues, setFormValues] = React.useState<{ [key: string]: any }>(formItemsObj);
    const [formErrors, setFormErrors] = React.useState<{ [key: string]: string }>(formItemsObj);

    // Still not sure if that useCallback will be effective here, so I left it for the time being
    const handleChange = (field: string, value: any) => {
        setFormValues(current => ({ ...current, [field]: value }));
    }

    const setFieldError = (field: string, message: string) => {
        setFormErrors(current => ({ ...current, [field]: message }));
    }

    const clearFieldError = (field: string) => {
        // Remove error associated with this field
        if (!formErrors[field]) return;

        setFormErrors(
            (current) => {
                const newErrors = { ...current };
                delete newErrors[field];
                return newErrors;
            }
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let errors: { [key: string]: string } = {};

        // Check each field (catch submit w/o blur)
        Object.entries(formItemValidators).forEach(
            ([field, validator]) => {
                const errMsg = validator(formValues[field]);
                if (errMsg)
                    errors[field] = errMsg;
            }
        )

        // If form level validation is provided - validate whole form
        if (validateForm) {
            const formErrors = validateForm(formValues);

            // Add form level errors to the existing ones or set as initial error 
            Object.keys(formErrors).forEach(
                error => errors[error]
                    ? errors[error] += `\n${formErrors[error]}`
                    : errors[error] = formErrors[error]
            )
        }

        setFormErrors(errors);

        // Submit if no errors
        if (Object.keys(errors).length === 0) {
            setIsLoading(true);

            onSubmit(formValues)
                .then(
                    // Clear the form on success
                    res => setFormValues(formItemsObj)
                )
                .catch(
                    // Show response result at the bottom of the form on error
                    rej => {
                        const lastItemKey = Object.keys(formItemsObj).at(-1);
                        if (lastItemKey)
                            setFieldError(lastItemKey, (rej as Error).message || 'Something went wrong!');
                    }
                )
                .finally(
                    // Toggle off loader
                    () => setIsLoading(false)
                )
        }

    }

    return (
        <FormContext.Provider value={{
            formValues,
            formErrors,
            handleChange,
            handleSubmit,
            setFieldError,
            clearFieldError
        }}>
            {children}

            {
                isLoading
                    ? <Loader />
                    : null
            }
        </FormContext.Provider >)
}
