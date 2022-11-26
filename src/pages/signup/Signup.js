import { useState } from 'react'
import useSignup from '../../hooks/useSignup'
import styles from './Signup.module.css'
const Signup = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [dispName, setDispName] = useState('')
    const { signup, isPending, error } = useSignup()
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(email, pass, dispName);
        signup(email, pass, dispName)
    }
    return (
        <div>

            <form onSubmit={handleSubmit} className={styles['signup-form']}>
                <h2>Signup</h2>
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
                <label>
                    <span>Name:</span>
                    <input
                        type='text'
                        value={dispName}
                        onChange={(e) => setDispName(e.target.value)}></input>
                </label>
                {!isPending && <button className="btn">sign up</button>}
                {isPending && <button className="btn" disabled>loading</button>}
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default Signup;
