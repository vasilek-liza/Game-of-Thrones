import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field}from '../charDetails';
import Error from '../error';
import {GotService} from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component {
    GotService = new GotService();
    
    state = {
        selectedHouses: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouses: id
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
                getData = {this.GotService.getAllHouses}
                renderItem = {(item) =>`${item.name} (${item.region})`}/>
        )
   
        const charDetails = (
            <CharDetails itemId = {this.state.selectedHouses}
            getData={this.GotService.getHouse} 
            >
                <Field field = 'region' label="Region" />
                <Field field = 'words' label="Words" />
                <Field field = 'titles' label="Titles" />
                <Field field = 'ancestralWeapons' label="Ancestral Weapons" />
            </CharDetails>
        )
        return (
            <RowBlock left={itemList} right={charDetails} /> 
        )
    }
}