import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "react-bootstrap/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";
import headshot from "../Images/HeadshotRound.png";
import '../styles/HomePageStyles.css'
import {Image} from "react-bootstrap";


const useStyles = makeStyles((theme) => {
    return ({
            [theme.breakpoints.up('lg')]: {
                gridItem: {
                    margin: '5em 0 5em 10em'
                },

            },
            [theme.breakpoints.down('md')]: {
                gridItem: {
                    margin: '5em 0 5em 5em',
                }
            },
            [theme.breakpoints.down('sm')]: {
                gridItem: {
                    margin: '2em 0 2em 2em',
                }
            },
            headshotContainer: {
                textAlignLast: 'center',
                textAlignCenter: "center",
                alignItems: "center",
            },
            root: {
                background: '#46b5d1',
                border: 0,
                borderRadius: 3,
                boxShadow: '0 3px 5px 2px rgba(21, 25, 101, .3)',
                color: 'white',
                height: 60,
                padding: '0 30px',
            },
            gridItem: {
                textAlign: 'left',
                '& a': {
                    color: `#46b5d1 !important`,
                }
            },
            headshot: {
                "&:hover, &:focus": {
                    transform: 'scale(1.1)'
                },
                height: 400,
                width: 400,
                borderRadius: '50%',
                transition: 'transform 0.2s',
            },
        }
    );

});

function AboutMe() {
    const classes = useStyles();

    return (
        <Grid item md={4} xs={12} className={classes.gridItem}>
            <h1><span className="nav-numbers">00.</span> About Me</h1>
            <p>Hey there my name is Chat, I am a software engineer from Atlanta, Ga.</p>
            <p>I enjoy creating things that live on the internet, whether that be websites (like this one!), applications, or
                anything in between. My goal is to always write code that is clean, efficient and reusable.</p>
            <p>I graduated from <a href="http://www.auburn.edu/">Auburn University</a> with a Bachelors in
                Information Systems Management and a focus in both Data Analytics and Cyber Security.
                I have always had a passion or automation and computers in general which led me to studying
                coding both at Auburn and in my free time.
            </p>
        </Grid>
    );
}

function HeadShot() {
    const classes = useStyles();

    return (
        <Grid item md={4} xs={12} className={[classes.headshotContainer, classes.gridItem]}>
            <Image roundedCircle src={headshot} alt={"Chat Sumlin headshot"} className={classes.headshot}/>
        </Grid>
    )
}

// Hook
function useWindowSize() {
    const isClient = typeof window === 'object';

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [getSize, isClient]); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
}

function HomePage() {
    const classes = useStyles();
    const size = useWindowSize();
    const isMobile = size.width <= 960;


    return (
        <React.Fragment>
            <Grid container
                  direction="row"
                  justify="flex-start"
                  alignItems="center">
                <Grid item xs={12} className={classes.gridItem}>
                    <h6>Hi, my name is</h6>
                    <h1>Chat Sumlin</h1>
                    <h2>I like to build web applications</h2>
                    <p>I'm a full-stack software engineer based in Atlanta, GA specializing in <br/>
                        building (and occasionally designing) exceptional websites, <br/>
                        applications, and everything in between.</p>
                    <Link to='/contact'><Button className={classes.root} size={"lg"}>Get In Touch</Button></Link>
                </Grid>
            </Grid>
            <Grid container className={classes.aboutMe} spacing={3}>
                {isMobile ? <HeadShot/> : <AboutMe/>}
                {isMobile ? <AboutMe/> : <HeadShot/>}
            </Grid>
        </React.Fragment>
    );
}

export default HomePage;