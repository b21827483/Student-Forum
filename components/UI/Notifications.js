import ReactDOM from 'react-dom';
import classes from '../../styles/Notifications.module.css';

function Notifications({notification}) {

    const {title, message, status} = notification;

    let notificationStatus = '';

    if (status === 'success') {
        notificationStatus = classes.success;
    }

    else if (status === 'error') {
        notificationStatus = classes.error
    }

    const container = `${classes.mainNotification} ${notificationStatus}`

    return (
        ReactDOM.createPortal(
            <div className={container}>
                <h1>{title}</h1>
                <p>{message}</p>
                <div className={classes.loader}/>
            </div>
            , document.getElementById('notification'))
    )
}

export default Notifications;