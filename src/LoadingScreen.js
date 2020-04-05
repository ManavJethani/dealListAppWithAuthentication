import React, {useEffect,useContext} from 'react'
import {Context} from './context/AuthContext'
import { ActivityIndicator,StyleSheet } from 'react-native'

const LoadingScreen = () => {
    const {tryLocalSignIn} = useContext(Context)
    useEffect(()=>{
        tryLocalSignIn()
    },[])
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader}/>
}


const styles = StyleSheet.create({
    loader:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    }
})

export default LoadingScreen

