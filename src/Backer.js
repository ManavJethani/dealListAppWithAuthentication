import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Context } from './context/AuthContext'
import DealList from './DealList'
import SearchComponent from './SearchComponent'

const Backer = ({ navigation }) => {
    const { state, Deals } = useContext(Context)
    const [filterList, getFilterList] = useState([])
    useEffect(() => {
        Deals()
    }, [])

    viewDetail = (param) => {
        navigation.navigate('Details', {
            itemId: param
        })
    }

    const getSearchTerm = (term) => {
        let filteredSearch = state.DealList.filter(ele => {
            return ele.title.toLowerCase().indexOf(term.toLowerCase()) !== -1
        })
        getFilterList(filteredSearch)
    }
    return <><View style={styles.container}>
        <SearchComponent term={getSearchTerm} />
        {filterList.length > 0 ? <DealList deals={filterList} viewDetail={viewDetail} />
            : <DealList deals={state.DealList} viewDetail={viewDetail} />
        }
    </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        // padding:10
        backgroundColor: '#f2f2f2'
    }
})

export default Backer