import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
// import Projects from "./Components/Projects";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import Projects from "./Components/Projects";
import Contact from "./Components/Contact";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LinkedIn from '@material-ui/icons/LinkedIn';
import "./index.css"
import Fab from "@material-ui/core/Fab";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            navLinks: [
                {name: "Home", path: "/"},
                {name: "Projects", path: "/projects"},
                {name: "Contact", path: "/contact"}
            ]
        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar bg="#222831" variant="dark">
                        <Navbar.Brand>
                            <img src={logo} height={30} width={30} className="logo" alt="Logo"/>
                        </Navbar.Brand>
                        <Navbar.Collapse>
                            <Nav className="mr-auto">
                                {this.state.navLinks.map((page, index) => {
                                    return <Nav.Link href={page.path}><span className="nav-numbers">0{index+1}.</span> {page.name}</Nav.Link>
                                })}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/projects" component={Projects}/>
                    <Route path="/contact" component={Contact}/>
                    <Fab href={"https://www.linkedin.com/in/chatsumlin/"} aria-label="like" className="fab-icon">
                        <LinkedIn />
                    </Fab>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;
