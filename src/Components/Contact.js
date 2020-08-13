import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Button, FormControl} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import axios from "axios";

class Contact extends Component {
    validateEmail(e) {
        let emailPattern = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$");
        return emailPattern.test(e.target.value)
    };

    constructor(props) {
        super(props);
        this.state = {
            contactForm: {
                name: {
                    valid: true,
                    value: ''
                },
                email: {
                    valid: true,
                    value: ''
                },
                phone: {
                    valid: true,
                    value: ''
                },
                company: {
                    valid: true,
                    value: ''
                },
                message: {
                    valid: true,
                    value: ''
                }
            },
            sent: false,
            buttonText: 'Send Message',
            error: null,
            success: null
        };
        this.emptyForm = Object.assign({}, this.state.contactForm);
        this.handleChange = this.handleChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.formSubmit = this.formSubmit.bind(this)

    }

    onBlur(e) {
        e.persist();

        this.setState(prevState => {
            let contactForm = Object.assign({}, prevState.contactForm);
            contactForm[e.target.name]["focused"] = false;

            contactForm[e.target.name]["blurred"] = true;
            return {contactForm}
        })    };

    onFocus(e) {
        e.persist();

        this.setState(prevState => {
            let contactForm = Object.assign({}, prevState.contactForm);
            contactForm[e.target.name]["blurred"] = false;
            contactForm[e.target.name]["focused"] = true;
            return {contactForm}
        })
    }

    validateForm() {
        let isValid = true;
        let contactForm = Object.assign({}, this.state.contactForm);
        Object.keys(this.state.contactForm).forEach(field => {
            if (!contactForm[field].valid) {
                isValid = false
            }
        });
        return isValid;
    }

    validatePhone(e) {
        let phonePattern = new RegExp("^[2-9]\\d{2}-\\d{3}-\\d{4}$");
        return phonePattern.test(e.target.value)
    }


    formSubmit = (e) => {
        e.preventDefault();

        this.setState({
            buttonText: 'Sending...',
            success: null,
            error: null
        });
        let contactForm = Object.assign({}, this.state.contactForm);
        let data = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            phone: contactForm.phone.value,
            company: contactForm.company.value,
            message: contactForm.message.value,
        };
        axios.post("/.netlify/functions/email", data)
            .then(response => {
                console.log(response.data);
                return this.setState({buttonText: "Send Message",success: "Your message has been delivered!"}, this.resetForm())
            })
            .catch(() => {
                this.setState({error: "Could not send message! Please try again later."})
            });
    };

    handleChange(e) {
        e.persist();
        this.setState((prevState) => {
            let contactForm = Object.assign({}, prevState.contactForm);
            if (!contactForm.hasOwnProperty(e.target.name)) {
                contactForm[e.target.name] = {
                    valid: false,
                    value: null
                }
            }
            switch (e.target.name) {
                case "email":
                    contactForm.email.valid = this.validateEmail(e);
                    break;
                case "phone":
                    contactForm.phone.valid = this.validatePhone(e);
                    break;
                default:
                    contactForm[e.target.name].valid = true;

            }
            contactForm[e.target.name].value = e.target.value;
            return {contactForm}
        })
    };

    resetForm() {
        return function () {
            return this.setState(this.emptyForm)
        };
    }


    render() {
        return (
            <Grid containe>
                <Grid item xs={6} className="m-4">
                    <Paper className="p-5">
                        <h2>Want to get in touch?</h2>
                        <p>I'm always looking for the next big opportunity for my career and I would love to hear from
                            you and your company!</p>
                        <form onSubmit={this.formSubmit}>
                            <FormControl fullWidth>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField onChange={this.handleChange}
                                                   name="name"
                                                   label="Your Name"
                                                   value={this.state.contactForm.name.value}
                                                   fullWidth required/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <TextField
                                                error={!this.state.contactForm.email.valid}
                                                onFocus={this.onFocus}
                                                onBlur={this.onBlur}
                                                label="Email"
                                                placeholder="your@email.com"
                                                name="email"
                                                onChange={this.handleChange}
                                                required fullWidth/>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <TextField
                                                error={!this.state.contactForm.phone.valid}
                                                onFocus={this.onFocus}
                                                onBlur={this.onBlur}
                                                label="Phone Number"
                                                placeholder="404-123-1234"
                                                name="phone"
                                                onChange={this.handleChange}
                                                required fullWidth/>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <TextField
                                                onFocus={this.onFocus}
                                                onBlur={this.onBlur}
                                                label="Company"
                                                placeholder="ACME Inc."
                                                name="company"
                                                onChange={this.handleChange}
                                                required fullWidth/>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField multiline onChange={this.handleChange}
                                                   name="message"
                                                   label="Your Message"
                                                   className="message-input"
                                                   rows={4}
                                                   value={this.state.contactForm.message.value}
                                                   required fullWidth/>
                                    </Grid>
                                    <Grid item>
                                        <Button type="submit" disabled={this.validateForm() === false}
                                                variant="contained"
                                                color="primary">{this.state.buttonText}</Button>
                                    </Grid>
                                    <Grid item xs={12} hidden={!this.state.error}>
                                        {(this.state.error) ? <Alert severity="error">{this.state.error}</Alert> : null}
                                    </Grid>
                                    <Grid item xs={12} hidden={!this.state.success}>
                                        {(this.state.success) ?
                                            <Alert severity="success">{this.state.success}</Alert> : null}
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default Contact;