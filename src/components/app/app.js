import React, { Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import Error from '../error';
import './app.css';
import CharacterPage from '../characterPage';
import HousesPage from '../housesPage';
import BooksPage from '../booksPage';
import {GotService} from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';



export default  class App extends Component {

    GotService = new GotService();

    state = {
        selectedChar: null,
        showRandomChar: true,
        error: false
    };

    onCharSelected = (id) => {
        this.setState(() => ({selectedChar: id}));
    }
     componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    };
    render() {
        if (this.state.error) {return <Error/>}
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        return (
            <Router>
            <div class="app"> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}                        
                            <button 
                                className="toggle-btn"
                                onClick={this.toggleRandomChar}>Toggle random character</button>
                        </Col>
                    </Row> 
                    <Route path="/" exact></Route>
                    <Route path="/characters" component={CharacterPage} />
                    <Route path="/books" component={BooksPage} />
                    <Route path="/houses" component={HousesPage} />
                    
                </Container>
            </ div>
        </Router>)
     }
 }; 

