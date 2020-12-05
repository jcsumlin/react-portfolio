import React, {useState, useEffect} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {List} from '../styles/Projects';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import Repo from "./Repo";
import CircularProgress from "@material-ui/core/CircularProgress";
const defaultAvatarUrl = "https://0.gravatar.com/avatar/91fc1c19f3633fbe104bc7788f9ead00";
const repositories = [
    {
        name: 'Peribot',
        owner: "jcsumlin",
        avatar_url: "",
    },
    {
        name: 'redditStats',
        owner: "jcsumlin",
        avatar_url: ""
    },
    {
        name: 'AWS-Log-uploader',
        owner: "jcsumlin",
        avatar_url: ""
    },
    {
        name: 'Hilda-Bot',
        owner: "jcsumlin",
        avatar_url: ""
    },
    {
        name: 'LBC-Notification-Project',
        owner: "jcsumlin",
        avatar_url: ""
    },
    {
        name: 'Comments-in-Reverse',
        owner: "jcsumlin",
        avatar_url: ""
    },
    {
        name: 'discord-ban-appeal',
        owner: "jcsumlin",
        avatar_url: ""
    },
];

function getRepo(owner, name) {
    return axios.get(`https://api.github.com/repos/${owner}/${name}`)
        .then((response) => {
            return response
        });
}

function Projects(props) {
    const [repo, setRepo] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getRepo(repositories[0]['owner'], repositories[0]['name'])
            .then((response) => {
                setRepo(response.data);
                setLoading(false);
            });
        repositories.forEach((repo, index) => {
            getRepo(repo.owner, repo.name)
                .then((response) => {
                    repositories[index].avatar_url = response.data.owner.avatar_url;
                })
        });


    }, []);


    return (
        <div className="p-5">
            <Grid container>
                <Grid item xs={12}>
                    <h1>Projects</h1>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Paper elevation={2} className="m-2">
                        <List>
                            {repositories.map(repo => (
                                <li key={repo.name}>
                                    <div>
                                        <Link to={"#"} onClick={() => {
                                            setLoading(true);
                                            getRepo(repo.owner, repo.name)
                                                .then((response) => {
                                                    setRepo(response.data);
                                                    setLoading(false);
                                                });
                                        }}>
                                            <img  width={32} height={32} src={repo.avatar_url ? repo.avatar_url : defaultAvatarUrl} alt={repo.owner}/>
                                            <span>{repo.name + "/" + repo.owner}</span>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12} style={{marginTop: `30px`}}>
                    <Paper elevation={2} className="p-4">
                        {repo && !loading ? (
                            <Repo repo={repo}/>
                        ) : null}
                        {!repo && loading ? <CircularProgress className="project"/> : null}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Projects;
