import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PersonInfo, ApiPersonInfo } from './types';
import { makeFetcher } from '../../common/api';
import { GetUserRes } from '../../common/types/reqres';
import { BsTelephone, BsEnvelope } from 'react-icons/bs';
import { CustomError } from '../../common/types';

export const usePerson = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [personInfo, setPersonInfo] = React.useState<PersonInfo | null>(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const BASEURL = process.env.REACT_APP_API_BASE_URL || 'https://reqres.in/api';
    const fetcher = makeFetcher<GetUserRes>();

    const apiToComponent = (info: ApiPersonInfo): PersonInfo => {
        const { first_name, last_name, email, avatar } = info;
        return {
            name: first_name && last_name ? `${first_name}  ${last_name}` : 'Василий Пупкин',
            avatar: avatar || 'https://placehold.co/124x124',
            bio: `Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.
        В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".
        Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.`,
            contacts: [
                {
                    icon: <BsTelephone />,
                    value: '+7(954)333-44-55',
                    href: 'tel:+7(954)333-44-55',
                },
                {
                    icon: <BsEnvelope />,
                    value: email || 'sykfafkar@gmail.com',
                    href: `mailto:${email}`,
                },
            ],
            role: 'Партнёр',
        }
    }

    React.useEffect(
        () => {
            fetcher(`${BASEURL}/users/${id}`)
                .then(
                    res => {
                        if (!res.success) throw new CustomError(res.error, res.status);
                        const { data: apiInfo } = res.data;
                        setPersonInfo(apiToComponent(apiInfo));
                    }
                )
                .catch(
                    (err) => {
                        console.error(err);
                        // Handle not-found response from the server
                        if (err.status === 404)
                            navigate('/')
                    }
                )
                .finally(
                    () => setIsLoading(false)
                )
        },
        []
    )

    return {
        isLoading,
        personInfo,
    }
}