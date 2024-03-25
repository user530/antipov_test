import { GetUsersRes } from '../../common/types';

interface WithLike {
    isLiked: boolean;
}

export type ApiCardDataType = GetUsersRes['data'][0];
export type CatalogueCard = ApiCardDataType & WithLike;
