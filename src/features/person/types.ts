import { ReactElement } from 'react';
import { GetUserRes } from '../../common/types/reqres';

interface PersonContact {
    icon: ReactElement;
    href: string;
    value: string;
}

export interface PersonInfo {
    avatar: string;
    name: string;
    role: string;
    contacts: PersonContact[];
    bio: string;
}

export type ApiPersonInfo = GetUserRes['data'];
