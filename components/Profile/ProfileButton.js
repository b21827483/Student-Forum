import {useState} from "react";
import Image from "next/image";
import {CgProfile} from "react-icons/cg";
import {RiEditBoxLine} from "react-icons/ri";
import {IoIosHelpCircleOutline, IoMdNotificationsOutline} from "react-icons/io";
import {CiLogout, CiSettings} from "react-icons/ci";

import classes from '../../styles/Profile.module.css'
import {signOut} from "next-auth/react";


function ProfileButton() {

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (<div className={classes.star}>
        <div className={classes.body}>
            <div className={`${classes.navigation} ${isActive ? classes.active : ""}`}>
                <div className={classes.userBx}>
                    {isActive && <div className={classes.imgBx}>
                                    <Image width={30} height={30} src="/Images/pp-not-found.png" alt="user" />
                                </div>}
                    <p className={classes.username}>Jully</p>
                </div>
                <div className={classes.menuToggle} onClick={handleClick} />
                <ul className={classes.menu}>
                    <li>
                        <a href="/"><CgProfile style={{marginRight: '0.5rem'}}/>My profile</a>
                    </li>
                    <li>
                        <a href="/"><RiEditBoxLine style={{marginRight: '0.5rem'}}/> Edit</a>
                    </li>
                    <li>
                        <a href="/"><IoMdNotificationsOutline style={{marginRight: '0.5rem'}}/> Notifications</a>
                    </li>
                    <li>
                        <a href="/"><CiSettings style={{marginRight: '0.5rem'}}/> Settings</a>
                    </li>
                    <li>
                        <a href="/"><IoIosHelpCircleOutline style={{marginRight: '0.5rem'}}/> Help & support</a>
                    </li>
                    <li>
                        <a onClick={() => {signOut()}}><CiLogout style={{marginRight: '0.5rem'}}/> Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    );
}

export default ProfileButton

