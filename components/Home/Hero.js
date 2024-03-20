import classes from '../../styles/Hero.module.css';

function Hero() {
    return (<div className={classes.homepage}>
        <div className={classes.background}>
            <img src='/Images/background.jpg'/>
            <span>Discuss your opportunities</span>
            <span>Decide your future</span>
        </div>
        <div className={classes.container}>
            <div className={classes.content}>
                <h1>Share</h1>
                <p>Students all around the country can share their experiences and connect via this platform.</p>
            </div>
            <div className={classes.content}>
                <h1>Post your questions</h1>
                <p>You tried your best, give a break. Ask what have you done wrong to the forum. Let them ease your burden a bit from your shoulders.</p>
            </div>
        </div>
    </div>)

}

export default Hero