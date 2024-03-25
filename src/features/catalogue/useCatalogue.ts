import React from 'react';
import { ApiCardDataType, CatalogueCard } from './types';
import { GetUsersRes } from '../../common/types';
import { makeFetcher } from '../../common/api';

export const useCatalogue = () => {
    const [loadedPages, setLoadedPages] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [cardsData, setCardsData] = React.useState<CatalogueCard[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const BASEURL = process.env.REACT_APP_API_BASE_URL || 'https://reqres.in/api';
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
        async (pageNumber: number, baseUrl: string = BASEURL) => {
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

    return {
        isLoading,
        cardsData,
        likeUser,
        totalPages,
        loadedPages,
        loadNextPage,
    }
}