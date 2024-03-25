import React from 'react';
import styles from './Main.template.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/store/useStore';
import { setUserId, setUserToken } from '../features/form/userSlice';

interface IMainTemplate {
    headerComponent: React.ReactNode;
    bodyComponent: React.ReactNode;
}

export const MainTemplate: React.FC<IMainTemplate> = ({ headerComponent, bodyComponent }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const leaveBtnClickHandler = () => {
        // Clear app store and local storage
        dispatch(setUserToken(null));
        dispatch(setUserId(null));
        localStorage.removeItem('token');
    };
    const backBtnClickHandler = () => {
        // Go back
        navigate(-1);
    };


    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <div className={styles['header-buttons']}>
                    <button className={styles['header-btn']} onClick={leaveBtnClickHandler}>Выход</button>
                    <button className={styles['header-btn']} onClick={backBtnClickHandler}>Назад</button>
                </div>
                <div className={styles['header-content']}>
                    {headerComponent}
                </div>
            </div>

            <div className={styles['body']}>
                {bodyComponent}
            </div>
        </div>
    )
}