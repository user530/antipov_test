import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
    return (
        <div className={styles['screen-blur']}>
            <div className={styles['loader']}></div>
        </div>
    )
}