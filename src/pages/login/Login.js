import { useState } from 'react';
import useLogin from '../../hooks/useLogin';
import styles from './Login.module.css'
const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const { login, error, isPending } = useLogin()
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(email, pass);
        login(email, pass)

    }
    return (
        <div>
            <form onSubmit={handleSubmit} className={styles['login-form']}>
                <h2>Login</h2>
                <label>
                    <span>Email:</span>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}></input>
                </label>
                <label>
                    <span>Password:</span>
                    <input
                        type='password'
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}></input>
                </label>
                {!isPending && <button className="btn">Login</button>}
                {isPending && <button className="btn" disabled>loading</button>}
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default Login;

