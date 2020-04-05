import { SearchBar } from 'react-native-elements';
import React from 'react'

export default class SearchComponent extends React.Component {
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search },()=>{
            this.props.term(search)
        });
    };

    render() {
        const { search } = this.state;
        return (
            <SearchBar
                searchIcon={false}
                cancelIcon={false}
                clearIcon={false}
                inputContainerStyle={{ backgroundColor: 'white' }}
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
            />
        );
    }
}

