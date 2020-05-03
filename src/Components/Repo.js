import React, {Component} from 'react';
import Chip from '@material-ui/core/Chip';
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CallSplitIcon from '@material-ui/icons/CallSplit';
// import { fontAwesomeIcon } from '@fontawesome/react-fontawesome'

import Image from "react-bootstrap/Image";
import {Grid} from "@material-ui/core";
import '../styles/RepoStyles.css';




class Repo extends Component {
    componentDidMount() {
    }

    render() {
        let repo = this.props.repo;
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                <Grid spacing={3} className="repo-owner">
                    <a href={repo.owner.html_url}><Image src={repo.owner.avatar_url} height={75} className="repo-image"/></a>
                    <h3>{repo.owner.login}</h3>
                    <h4>{repo.name}</h4>
                </Grid>
                <Grid item className="repo-chips">
                    <br/>
                    <Chip
                        icon={<StarIcon />}
                        label={repo.stargazers_count.toString() + " Stargazers"}
                        clickable
                        color="primary"
                        className="chip"
                    />
                    <Chip
                        icon={<VisibilityIcon />}
                        label={repo.watchers_count.toString() + " Watchers"}
                        clickable
                        color="primary"
                        className="chip"
                    />
                    <Chip
                        icon={<CallSplitIcon />}
                        label={repo.forks.toString() + " Forks"}
                        clickable
                        color="primary"
                        className="chip"
                    />
                </Grid>
                <Grid item>
                    {repo.description}
                </Grid>
                <Grid item>

                </Grid>
            </Grid>
        );
    }
}

export default Repo;