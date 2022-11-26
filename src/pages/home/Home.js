import useAuthContext from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection'

import styles from './Home.module.css'
import TransactionForm from './TransactionForm';
const Home = () => {
    const { user } = useAuthContext();
    const { documents, error } = useCollection('transactions');
    return (
        <div className={styles.container}>
            <div className={styles.content}>
            {error && <p>{error}</p>}
            </div>
            <div className={styles.sidebar}>
                <TransactionForm uid={user.uid}/>
            </div>
        </div>
    );
}

export default Home;