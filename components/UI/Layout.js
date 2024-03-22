import {Fragment} from "react";
import MainNavigation from "./MainNavigation";
import ProfileButton from "../Profile/ProfileButton";

function Layout(props) {

    return <Fragment>
                <MainNavigation />
                <main>
                    {props.children}
                </main>
           </Fragment>
}

export default Layout