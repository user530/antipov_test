export interface PostLoginRes extends WithToken { }

export interface PostRegisterRes extends WithToken, WithId { }

export interface GetUsersRes extends
    WithPagination,
    WithData<(WithId & WithEmail & WithName & WithAvatar)[]>,
    WithSupport<WithUrlAndText> { }

export interface GetUserRes extends
    WithData<(WithId & WithEmail & WithName & WithAvatar)>,
    WithSupport<WithUrlAndText> { }

export interface ErrorRes extends WithError { };

interface WithPagination {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
}

interface WithData<D> {
    data: D;
}

interface WithSupport<S> {
    support: S;
}

interface WithId {
    id: number;
}

interface WithToken {
    token: string;
}

interface WithName {
    first_name: string;
    last_name: string;
}

interface WithEmail {
    email: string;
}

interface WithAvatar {
    avatar: string;
}

interface WithUrlAndText {
    url: string;
    text: string;
}

interface WithError {
    error: string;
}
