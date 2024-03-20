import {useEffect, useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";

import classes from '../../styles/Auth.module.css'
import Notifications from "../UI/Notifications";

async function createNewUser(credentials) {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {'Content-Type': 'application/json'}
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to create an account.')
    }

    return data;
}

export function Auth({isLogin}) {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reqStatus, setReqStatus] = useState('');
    const [resError, setResError] = useState('');

    const router = useRouter();

    useEffect(() => {

        if (reqStatus === 'Error' || reqStatus === 'Success') {
            const timer = setTimeout(() => {
                setReqStatus(null);
                setResError(null);

                if (reqStatus === 'Success') {
                    router.replace('/');
                }
            }, 3000);

            return () => clearTimeout(timer)
        }

    },[reqStatus]);

    async function formSubmitHandler(event) {
        event.preventDefault();
        setReqStatus('Loading');
        try {
            if (isLogin) {
                const response = await signIn('credentials', {
                    email: email,
                    password: password,
                    redirect: false
                })

                console.log(response)


                if (response.error) {
                    setReqStatus('Error');
                    setResError(response.error);
                }

                else {
                    setReqStatus('Success');
                }
            }

            else {
                await createNewUser({name: name, surname: surname, email:email, password: password});
                setReqStatus('Success');
            }
        } catch (e) {
            setResError(e.message);
            setReqStatus('Error')
        }

    }

    function toggleForm() {
        isLogin ? router.replace('/signup') : router.replace('/login');
    }

    let notification;

    if (reqStatus === 'Loading') {
        notification = {
            title: 'Loading',
            message: 'Loading',
            status: 'loading'
        }
    }

    else if (reqStatus === 'Success') {
        notification = {
            title: 'Success',
            message: isLogin ? 'Successfully logged in' : 'Successfully created account.',
            status: 'success'
        }
    }

    else if (reqStatus === 'Error') {
        notification = {
            title: 'Error',
            message: resError,
            status: 'error'
        }
    }

    const wrapper = notification ? `${classes.wrapper} ${classes.notification}` : classes.wrapper;

    return <>
        <section className={classes.section}>
            <div className={wrapper}>
                <div className={classes.wrapperContainer}>
                    <h1 className={classes.header}>{isLogin ? 'Login' : 'Signup'}</h1>
                    <form onSubmit={formSubmitHandler} className={classes.form}>
                        <div className={classes.inputContainer}>
                            {!isLogin &&
                                <div className={classes.input}>
                                    <input id='name'
                                           placeholder='Name'
                                           value={name}
                                           onChange={(event) => setName(event.target.value)}/>
                                    <input id='surname'
                                           placeholder='Surname'
                                           value={surname}
                                           onChange={(event) => setSurname(event.target.value)}/>
                                </div>}
                            <div className={classes.input}>
                                <input id='email'
                                       placeholder='E-Mail'
                                       value={email}
                                       onChange={(event) => setEmail(event.target.value)}/>
                            </div>
                            <div className={classes.input}>
                                <input id='password'
                                       type='password'
                                       placeholder='Password'
                                       value={password}
                                       onChange={(event) => setPassword(event.target.value)}/>
                                {/*<span className={classes.passwordToggle}>*/}
                                {/*    <i className='fas fa-eye'/>*/}
                                {/*</span>*/}
                            </div>
                        </div>
                        <div className={classes.actions}>
                            <button type='button' onClick={toggleForm}>{isLogin ? 'Do not have an account? Sign Up' : 'Sign in'}</button>
                            <button>{isLogin ? 'Login' : 'Create your Forum account'}</button>
                        </div>
                    </form>
                </div>
            </div>
            {notification && <Notifications notification={notification}/>}
        </section>
    </>
}

export default Auth