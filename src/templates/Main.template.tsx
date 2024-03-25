import React, { PropsWithChildren } from 'react';
import styles from './Main.template.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/store/useStore';
import { setUserId, setUserToken } from '../features/form/userSlice';
import { useMediaQuery } from 'react-responsive';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { FaAngleLeft } from 'react-icons/fa'

interface IMainTemplate {
    headerComponent?: React.ReactNode;
    addBackBtn?: boolean;
}

export const MainTemplate: React.FC<PropsWithChildren<IMainTemplate>> = ({ headerComponent, addBackBtn, children }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

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
                    <button className={styles['header-btn']} onClick={leaveBtnClickHandler}>
                        {isMobile ? <RiLogoutBoxRLine size={18} /> : 'Выход'}
                    </button>
                    {
                        addBackBtn
                            ? (
                                <button className={styles['header-btn']} onClick={backBtnClickHandler}>
                                    {isMobile ? <FaAngleLeft size={18} /> : 'Назад'}
                                </button>
                            )
                            : null
                    }
                </div>
                <div className={styles['header-content']}>
                    {headerComponent ? headerComponent : <h1>Another page</h1>}
                </div>
            </div>

            <div className={styles['body']}>
                {children}
            </div>
        </div>
    )
}