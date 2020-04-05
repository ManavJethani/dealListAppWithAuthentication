import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {Button} from 'react-native-elements'
import Spacer from './components/spacer'
import { Context } from './context/AuthContext'


const AccoutScreen = () => {
    const { state, signOut } = useContext(Context)
    return <><View style={styles.view}>
        <Button style={styles.Button} title="Sign out" onPress={signOut}></Button>
    </View>
    </>
}


const styles = StyleSheet.create({
    view: {
        flex:1,
        justifyContent: 'center',
        borderWidth: 1,
        height:200,
        borderColor: '#ccc',
        backgroundColor: 'white'
    },
    Button:{
        width:'50%'
    }
})

export default AccoutScreen