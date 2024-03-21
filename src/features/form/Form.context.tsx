import React from 'react';

interface IFormContext {
    formValues: { [key: string]: any };
    formErrors: { [key: string]: string };
    handleChange: (field: string, value: any) => void;
    handleSubmit: (e: React.FormEvent) => void;
    setFieldError: (field: string, message: string) => void;
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
    onSubmit: (values: { [key: string]: any }) => void;
    validateForm?: (values: { [key: string]: any }) => { [key: string]: string };
}

export const FormProvider: React.FC<FormProviderProps> = ({ children, onSubmit, validateForm }) => {
    const [formValues, setFormValues] = React.useState<{ [key: string]: any }>({});
    const [formErrors, setFormErrors] = React.useState<{ [key: string]: string }>({});

    const handleChange = (field: string, value: any) => {
        setFormValues(current => ({ ...current, [field]: value }));

        // Remove error associated with this field
        if (formErrors[field])
            setFormErrors(
                (current) => {
                    const newErrors = { ...current };
                    delete newErrors[field];
                    return newErrors;
                }
            );
    }

    const setFieldError = (field: string, message: string) => {
        setFormErrors(current => ({ ...current, [field]: message }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let errors: { [key: string]: string } = {};

        // If form level validation is provided -> validate whole form
        if (validateForm) {
            errors = validateForm(formValues);
            setFormErrors(errors);
        }

        // Submit if no errors
        if (Object.keys(formErrors).length === 0)
            onSubmit(formValues);
    }

    return (
        <FormContext.Provider value={{
            formValues,
            formErrors,
            handleChange,
            handleSubmit,
            setFieldError,
        }}>
            {children}
        </FormContext.Provider >)
}
