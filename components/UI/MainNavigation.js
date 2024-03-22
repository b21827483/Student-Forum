import Link from "next/link";

import classes from '../../styles/MainNavigation.module.css'
import {signOut, useSession} from "next-auth/react";
import {useState} from "react";

import {CgProfile} from "react-icons/cg";
import {RiEditBoxLine} from "react-icons/ri";
import {IoMdNotificationsOutline} from "react-icons/io";
import {CiSettings} from "react-icons/ci";
import {IoIosHelpCircleOutline} from "react-icons/io";
import {CiLogout} from "react-icons/ci";
import ProfileButton from "../Profile/ProfileButton";

function MainNavigation() {

    const {data: session, status} = useSession();

    console.log(session)

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
                    {session && <ProfileButton /> }
                </li>
            </ul>
        </nav>
    </header>
}

export default MainNavigation