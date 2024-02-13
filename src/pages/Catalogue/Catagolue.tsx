import React from 'react';
import styles from './Catalogue.module.scss';
import { FaAngleLeft, FaAngleDown, FaRegHeart, FaHeart } from 'react-icons/fa';

export const Catalogue: React.FC = () => {
    const cardData = [
        {
            imgSrc: 'https://placehold.co/124x124',
            name: 'Артур Королёв',
            isLiked: false,
        },
        {
            imgSrc: 'https://placehold.co/124x124',
            name: 'Ольга Ильина',
            isLiked: true,
        },
        {
            imgSrc: 'https://placehold.co/124x124',
            name: 'Замир Орлов',
            isLiked: false,
        },
        {
            imgSrc: 'https://placehold.co/124x124',
            name: 'Даниил Новиков',
            isLiked: false,
        },
        {
            imgSrc: 'https://placehold.co/124x124',
            name: 'Диана Андреева',
            isLiked: false,
        },
        {
            imgSrc: 'https://placehold.co/124x124',
            name: 'Захар Романов',
            isLiked: false,
        },
        {
            imgSrc: 'https://placehold.co/124x124',
            name: 'Егор Волков',
            isLiked: false,
        },
        {
            imgSrc: 'https://placehold.co/124x124',
            name: 'Кира Попова',
            isLiked: false,
        },
    ]

    return (
        <div className={styles['catalogue-wrapper']}>
            <div className={styles['catalogue-header']}>
                <div className={styles['header-buttons']}>
                    <button className={styles['header-btn']}>Выход</button>
                    <button className={styles['header-btn']}>Назад</button>
                    {/* <button className={styles['header-btn']}><FaAngleLeft size={20} /></button> */}
                </div>
                <div className={styles['header-content']}>
                    <h1 className={styles['header-heading']}>Наша команда</h1>
                    <p className={styles['header-text']}>Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций. </p>
                </div>
            </div>

            <div className={styles['catalogue-body']}>
                <div className={styles['body-container']}>
                    <div className={styles['cards-wrapper']}>
                        {
                            cardData.map(
                                ({ imgSrc, name, isLiked }, ind) => (
                                    <div key={ind} className={styles['card-item']}>
                                        <a href='#!' className={styles['card']}>
                                            <div className={styles['card-content']}>
                                                <div className={styles['content-img']}>
                                                    <img src={imgSrc} alt={name} width={124} height={124} />
                                                </div>
                                                <div className={styles['content-title']}>
                                                    {name}
                                                </div>
                                            </div>
                                        </a>
                                        <div className={styles['card-btn']}>
                                            {isLiked ? <FaHeart /> : <FaRegHeart />}
                                        </div>
                                    </div>
                                )
                            )
                        }

                    </div>
                    <div className={styles['buttons-wrapper']}>
                        <button className={styles['body-btn']}>
                            <span className={styles['body-btn__txt']}>Показать еще</span>
                            <span className={styles['body-btn__icon']}><FaAngleDown /></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}