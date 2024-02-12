import React from 'react';
import styles from './Signup.module.scss';
import { Form } from '../../features/form/Form';

export const Signup: React.FC = () => {

    return (
        <div className={styles['wrapper']}>
            <Form formName='Регистрация' />
        </div>
    )
}