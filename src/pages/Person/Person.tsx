import React from 'react';
import styles from './Person.module.scss';
import { BsTelephone, BsEnvelope } from "react-icons/bs";

export const Person: React.FC = () => {
    const personData = {
        imgSrc: 'https://placehold.co/124x124',
        name: 'Артур Королёв',
        role: 'Партнёр',
        contacts: [
            {
                icon: <BsTelephone />,
                href: 'tel:',
                value: '+7 (954) 333-44-55'
            },
            {
                icon: <BsEnvelope />,
                href: 'mailto:',
                value: 'sykfafkar@gmail.com'
            },
        ],
        bio: `Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.
        В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".
        Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.`,
    }

    return (
        <div className={styles['catalogue-wrapper']}>
            <div className={styles['catalogue-header']}>
                <div className={styles['header-buttons']}>
                    <button className={styles['header-btn']}>Выход</button>
                    <button className={styles['header-btn']}>Назад</button>
                </div>
                <div className={styles['header-content']}>

                    <div className={styles['container']}>
                        <div className={styles['inner-header']}>
                            <div className={styles['header-img']}>
                                <img src={personData.imgSrc} alt={personData.name} width={187} height={187} />
                            </div>
                            <div className={styles['header-info']}>
                                <h1 className={styles['info-main']}>{personData.name}</h1>
                                <h2 className={styles['info-sub']}>{personData.role}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['catalogue-body']}>
                <div className={styles['container']}>
                    <div className={styles['inner-body']}>
                        <div className={styles['inner-body__bio']}>
                            {
                                personData.bio.split('\n').map(
                                    (txtBlock, ind) => (<p key={`txt-${ind}`}>{txtBlock}</p>)
                                )
                            }
                        </div>
                        <div className={styles['inner-body__contacts']}>
                            <ul className={styles['contacts-list']}>
                                {
                                    personData.contacts.map(
                                        ({ icon, href, value }, ind) => (
                                            <li key={`contact-${ind}`}>
                                                <a href={href + value}>
                                                    <span className={styles['contact-icon']}>{icon}</span>
                                                    <span>{value}</span>
                                                </a>
                                            </li>
                                        )
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}