import React, { ChangeEvent, memo, useState } from 'react';

interface ISingleInput {
    name: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    itemPlaceholder?: string;
    itemValidation?: {
        validationCb: (value: string) => boolean;
        validationErr: string;
    }
}

const SingleInput: React.FC<ISingleInput> = (props: ISingleInput) => {
    const { handleChange, name, itemPlaceholder, itemValidation } = props;

    console.log(`INPUT ${name} RENDERED`);

    return (
        <>
            <label htmlFor={name}>{name}</label>
            <input
                type="text"
                name={name}
                placeholder={itemPlaceholder ? itemPlaceholder : undefined}
                onChange={(e) => handleChange(e)}
                onBlur={itemValidation
                    ? (e) => {
                        const isValid = itemValidation.validationCb(e.target.value);
                        isValid ? e.target.classList.add('error') : e.target.classList.remove('error');
                    }
                    : undefined}
            />
        </>
    )
}

export default memo(SingleInput)