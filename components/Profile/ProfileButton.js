import Link from "next/link";
import Image from "next/image";

import classes from '../../styles/Profile.module.css'
import {useState} from "react";

function ProfileButton() {

    const [openSetting, setOpenSettings] = useState(false);

    function settingsHandler() {
        setOpenSettings((prevState) => {return !prevState})
    }

    return <div onClick={settingsHandler} className={classes.profileImgContainer}>
        <Image src='/Images/pp-not-found.png' height={50} width={50}>
        </Image>
        {openSetting && <div>
            <p>Account Settings</p>
            <p>Admin Page</p>
            <p>Log out</p>
        </div>}
    </div>
}

export default ProfileButton