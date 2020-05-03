import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import '../styles/FooterStyles.css'
class Footer extends Component {

    render() {
        return (
            <React.Fragment>
                <Grid container xs={12} spacing={10} className="footer">
                    <Grid item className="p-5">
                        <Container maxWidth="sm">
                            Chat Sumlin | Portfolio
                        </Container>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default Footer;