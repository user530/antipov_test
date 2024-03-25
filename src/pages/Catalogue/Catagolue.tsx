import React from 'react';
import styles from './Catalogue.module.scss';
import { FaAngleDown, FaRegHeart, FaHeart } from 'react-icons/fa';
import { MainTemplate } from '../../templates/Main.template';
import { Link } from 'react-router-dom';
import { makeFetcher } from '../../common/api';
import { Loader } from '../../features/loader/Loader';
import { GetUsersRes } from '../../common/types';

type ApiCardDataType = GetUsersRes['data'][0];

interface WithLike {
    isLiked: boolean;
}

type CatalogueCard = ApiCardDataType & WithLike;

export const Catalogue: React.FC = () => {
    const [loadedPages, setLoadedPages] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [cardsData, setCardsData] = React.useState<CatalogueCard[]>([]);

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const fetcher = makeFetcher<GetUsersRes>();

    const attachLikes = (usersData: ApiCardDataType[]): CatalogueCard[] => {
        const catalogueCards = usersData.map(
            (userInfo) => {
                const isLiked = localStorage.getItem(userInfo.id.toString()) === 'true' ? true : false;
                return { ...userInfo, isLiked }
            }
        );

        return catalogueCards;
    }

    const fetchUsers = React.useCallback(
        async (pageNumber: number, baseUrl: string = 'https://reqres.in/api') => {
            return fetcher(`${baseUrl}/users?page=${pageNumber}`)
                .then(
                    (res) => {
                        // Handle failed fetch result in catch block
                        if (!res.success) throw new Error(res.error);

                        return res;
                    }
                )
                .catch(
                    (err) => console.error(err)
                )
        },
        [fetcher]
    )

    const loadNextPage = () => {
        // Load next page
        fetchUsers(loadedPages + 1)
            .then(
                (fetchData) => {
                    if (!fetchData) return;

                    const { data: { total_pages, data } } = fetchData;

                    // If pagination is still not set
                    if (totalPages === 0 && total_pages > 0)
                        setTotalPages(total_pages);

                    // Add new users
                    setCardsData(current => [...current, ...attachLikes(data)]);

                    // Update page counter
                    setLoadedPages(prev => prev + 1);
                }
            )
    }

    const likeUser = (userId: number) => {
        const newData = cardsData.map(
            (userData) => {
                const { id, isLiked } = userData
                // Dont change other user data
                if (id !== userId) return userData;

                // Store new like status
                localStorage.setItem(id.toString(), `${!isLiked}`);

                return { ...userData, isLiked: !isLiked }
            }
        )

        setCardsData(newData);
    }

    // Load first page
    React.useEffect(
        () => {
            setIsLoading(true);
            // Fetch first page
            loadNextPage()
            setIsLoading(false);
        },
        []
    )

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
                                        // cardData.map(
                                        //     ({ id, imgSrc, name, isLiked }, ind) => (
                                        //         <div key={ind} className={styles['card-item']}>
                                        //             <Link to={`/person/${id}`} className={styles['card']}>
                                        //                 <div className={styles['card-content']}>
                                        //                     <div className={styles['content-img']}>
                                        //                         <img src={imgSrc} alt={name} width={124} height={124} />
                                        //                     </div>
                                        //                     <div className={styles['content-title']}>
                                        //                         {name}
                                        //                     </div>
                                        //                 </div>
                                        //             </Link>
                                        //             <div className={styles['card-btn']}>
                                        //                 {isLiked ? <FaHeart /> : <FaRegHeart />}
                                        //             </div>
                                        //         </div>
                                        //     )
                                        // )
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

                                {/* <div className={styles['buttons-wrapper']}>
                                    <button className={styles['body-btn']}>
                                        <span className={styles['body-btn__txt']}>Показать еще</span>
                                        <span className={styles['body-btn__icon']}><FaAngleDown /></span>
                                    </button>
                                </div> */}
                            </>
                        )
                }
            </div >
        </MainTemplate>


        // <div className={styles['catalogue-wrapper']}>
        //     <div className={styles['catalogue-header']}>
        //         <div className={styles['header-buttons']}>
        //             <button className={styles['header-btn']}>Выход</button>
        //             <button className={styles['header-btn']}>Назад</button>
        //         </div>
        //         <div className={styles['header-content']}>
        //             <h1 className={styles['header-heading']}>Наша команда</h1>
        //             <p className={styles['header-text']}>Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций. </p>
        //         </div>
        //     </div>

        //     <div className={styles['catalogue-body']}>
        //         <div className={styles['body-container']}>
        //             <div className={styles['cards-wrapper']}>
        //                 {
        //                     cardData.map(
        //                         ({ imgSrc, name, isLiked }, ind) => (
        //                             <div key={ind} className={styles['card-item']}>
        //                                 <a href='#!' className={styles['card']}>
        //                                     <div className={styles['card-content']}>
        //                                         <div className={styles['content-img']}>
        //                                             <img src={imgSrc} alt={name} width={124} height={124} />
        //                                         </div>
        //                                         <div className={styles['content-title']}>
        //                                             {name}
        //                                         </div>
        //                                     </div>
        //                                 </a>
        //                                 <div className={styles['card-btn']}>
        //                                     {isLiked ? <FaHeart /> : <FaRegHeart />}
        //                                 </div>
        //                             </div>
        //                         )
        //                     )
        //                 }

        //             </div>
        //             <div className={styles['buttons-wrapper']}>
        //                 <button className={styles['body-btn']}>
        //                     <span className={styles['body-btn__txt']}>Показать еще</span>
        //                     <span className={styles['body-btn__icon']}><FaAngleDown /></span>
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}