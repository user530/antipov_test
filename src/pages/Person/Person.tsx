import React from 'react';
import styles from './Person.module.scss';
import { MainTemplate } from '../../templates/Main.template';
import { Loader } from '../../features/loader/Loader';
import { usePerson } from '../../features/person/usePerson';

export const Person: React.FC = () => {
    const { personInfo } = usePerson();

    return (
        personInfo
            ?
            <MainTemplate
                addBackBtn={true}
                headerComponent={
                    <div className={styles['container']}>
                        <div className={styles['inner-header']}>
                            <div className={styles['header-img']}>
                                <img src={personInfo.avatar} alt={personInfo.name} width={187} height={187} />
                            </div>
                            <div className={styles['header-info']}>
                                <h1 className={styles['info-main']}>{personInfo.name}</h1>
                                <h2 className={styles['info-sub']}>{personInfo.role}</h2>
                            </div>
                        </div>
                    </div>
                }>

                <div className={styles['container']}>
                    <div className={styles['inner-body']}>
                        <div className={styles['inner-body__bio']}>
                            {
                                personInfo.bio.split('\n').map(
                                    (txtBlock, ind) => (<p key={`txt-${ind}`}>{txtBlock}</p>)
                                )
                            }
                        </div>
                        <div className={styles['inner-body__contacts']}>
                            <ul className={styles['contacts-list']}>
                                {
                                    personInfo.contacts.map(
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
            </MainTemplate>
            : <Loader />
    )
}