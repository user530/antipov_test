import React, { ChangeEvent, memo } from 'react';

interface ISingleInput {
    name: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SingleInput: React.FC<ISingleInput> = (props: ISingleInput) => {
    const { handleChange, name } = props;

    console.log(`INPUT ${name} RENDERED`);

    return (
        <>
            <label htmlFor={name}>{name}</label>
            <input type="text" name={name} onChange={(e) => handleChange(e)} />
        </>
    )
}

export default memo(SingleInput)