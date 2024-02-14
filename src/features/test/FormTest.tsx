import React, { ChangeEvent, FormEvent } from 'react';
import SingleInput from './Input';


interface IFormData {
    fName: string;
    lName: string;
}

export const TestForm: React.FC = () => {
    const [formData, setFormData] = React.useState<IFormData>({
        fName: '',
        lName: '',
    });

    const handleChange = React.useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setFormData(
            (prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            })
        ), []
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                Object.keys(formData).map(
                    (key, ind) => <SingleInput key={key} name={key} handleChange={handleChange} />
                )
            }
            <button type="submit">SUBMIT</button>
        </form>
    )
}