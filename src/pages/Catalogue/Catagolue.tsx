import React from 'react';
import styles from './Catalogue.module.scss';
import { FaAngleDown, FaRegHeart, FaHeart } from 'react-icons/fa';
import { MainTemplate } from '../../templates/Main.template';
import { Link } from 'react-router-dom';
import { Loader } from '../../features/loader/Loader';
import { useCatalogue } from '../../features/catalogue/useCatalogue';

export const Catalogue: React.FC = () => {
    const { isLoading, cardsData, likeUser, totalPages, loadedPages, loadNextPage } = useCatalogue();

    return (
        < MainTemplate
            headerComponent={
                <>
                    <h1 className={styles['header-heading']}>Наша команда</h1>
                    <p className={styles['header-text']}>Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций. </p>
                </>
            }
        >
            < div className={styles['body-container']} >
                {
                    isLoading
                        ? <Loader />
                        : (
                            <>
                                <div className={styles['cards-wrapper']}>
                                    {
                                        cardsData.map(
                                            ({ id, avatar, first_name, last_name, isLiked }) => (
                                                <div key={first_name + id} className={styles['card-item']}>
                                                    <Link to={`/person/${id}`} className={styles['card']}>
                                                        <div className={styles['card-content']}>
                                                            <div className={styles['content-img']}>
                                                                <img
                                                                    src={avatar}
                                                                    alt={`${first_name} ${last_name}`}
                                                                    width={124}
                                                                    height={124} />
                                                            </div>
                                                            <div className={styles['content-title']}>
                                                                {`${first_name} ${last_name}`}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <div
                                                        className={styles['card-btn']}
                                                        onClick={() => likeUser(id)}>
                                                        {isLiked ? <FaHeart /> : <FaRegHeart />}
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                </div>

                                {
                                    totalPages > loadedPages
                                        ? (
                                            <div className={styles['buttons-wrapper']}>
                                                <button className={styles['body-btn']} onClick={loadNextPage}>
                                                    <span className={styles['body-btn__txt']}>Показать еще</span>
                                                    <span className={styles['body-btn__icon']}><FaAngleDown /></span>
                                                </button>
                                            </div>
                                        )
                                        : null
                                }
                            </>
                        )
                }
            </div >
        </MainTemplate>
    )
}