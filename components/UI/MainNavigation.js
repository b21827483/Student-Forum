import Link from "next/link";

import classes from '../../styles/MainNavigation.module.css'
import {useSession} from "next-auth/react";
import ProfileButton from "../Profile/ProfileButton";

function MainNavigation() {

    const {data: session, status} = useSession();
    console.log(session, status)

    return <header className={classes.header}>
        <Link href={'/'}>
            <h1>Student Forum</h1>
        </Link>
        <nav>
            <ul>
                <li>
                    {!session && status === 'unauthenticated' && <Link href={'/signup'}>Signup</Link>}
                </li>
                <li>
                    {!session && status === 'unauthenticated' && <Link href={'/login'}>Login</Link>}
                </li>
                <li>
                    {session && <ProfileButton />}
                </li>
            </ul>
        </nav>
    </header>
}

export default MainNavigation