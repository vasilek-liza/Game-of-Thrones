import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field}from '../charDetails';
import Error from '../error';
import {GotService} from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {

    GotService = new GotService();
    
    state = {
        selectedChar: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
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
            getData = {this.GotService.getAllCharacters}
            renderItem = {(item) =>`${item.name} (${item.gender})`}/>

        )

        const charDetails = (
            <CharDetails itemId = {this.state.selectedChar}
            getData = {this.GotService.getCharacter}>
                <Field field = 'gender' label="Gender" />
                <Field field = 'born' label="Born" />
                <Field field = 'died' label="Died" />
                <Field field = 'culture' label="Culture" />

            </CharDetails>
        )
        return (
            <RowBlock left={itemList} right={charDetails} /> 
        )
    }
}
