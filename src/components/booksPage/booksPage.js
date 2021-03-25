import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field}from '../charDetails';
import Error from '../error';
import {GotService} from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class BooksPage extends Component {

    GotService = new GotService();
    
    state = {
        selectedBooks: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBooks: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if(this.state.error) {
            return <Error/>
        }

        const itemList = (
            <ItemList onItemSelected={this.onItemSelected}
            getData = {this.GotService.getAllBooks}
            renderItem = {(item) =>`${item.name}`}/>

        )

        const charDetails = (

            <CharDetails itemId = {this.state.selectedBooks}
            getData={this.GotService.getBook}
            >
                <Field field = 'numberOfPages' label="Number Of Pages" />
                <Field field = 'publisher' label="Publisher" />
                <Field field = 'released' label="Released" />
            </CharDetails>
        )
        return ( 
            <RowBlock left={itemList} right={charDetails} /> 
        )
    }
}



