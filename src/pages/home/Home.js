import useAuthContext from '../../hooks/useAuthContext';
import styles from './Home.module.css'
import Transaction from './Transaction';
const Home = () => {
    const { user } = useAuthContext()
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                transaction list
            </div>
            <div className={styles.sidebar}>
                <Transaction uid={user.uid}></Transaction>
            </div>
        </div>
    );
}

export default Home;