import React, { useContext, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, TextInput, ImageBackground} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Button } from 'react-native-elements'
import Spacer from './components/spacer'
import { Context } from './context/AuthContext'


const SignInScreen = ({ navigation }) => {
    const { state, signIn, clearErrorMessaage } = useContext(Context)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    return <>
        <ImageBackground source={require('./images/photo-1523821741446-edb2b68bb7a0.jpg')}
            style={styles.BackImageStyle}>
            <View style={styles.mainWrapper}>
                <View style={styles.container}>
                    <Spacer><Text style={{ fontSize: 22,textAlign:'center' }}>Sign In to Application</Text></Spacer>
                    <View style={styles.formView}>
                        <NavigationEvents
                            onWillBlur={clearErrorMessaage}
                        />
                        <Spacer>
                            <View>
                                <Text style={styles.text}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setEmail}
                                    value={email}></TextInput>
                            </View>
                        </Spacer>
                        <Spacer>
                            <View>
                                <Text style={styles.text}>Password</Text>
                                <TextInput
                                    secureTextEntry
                                    style={styles.input}
                                    onChangeText={setPassword}
                                    value={password}></TextInput>
                            </View>
                        </Spacer>
                        <Spacer>
                            {state.ErrorMessage !== "" && <Text style={styles.errText}>{state.ErrorMessage}</Text>}
                        </Spacer>
                        <Spacer>
                        <Button title="Sign In" onPress={() => signIn({ email, password })}></Button>
                        </Spacer>
                        <Spacer>
                            <TouchableOpacity onPress={() => { navigation.navigate('Signup') }}>
                                <Text>Dont have an account? create new account</Text>
                            </TouchableOpacity>
                        </Spacer>
                    </View>
                </View>
            </View>
        </ImageBackground>
    </>
}

SignInScreen.navigationOption = () => {
    return {
        header: null
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'blue',
        fontSize: 20
    },
    text: {
        fontSize: 20
    },
    container: {
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white'
    },
    mainWrapper: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        // backgroundColor:'blue'
    },
    BackImageStyle: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    errText: {
        fontSize: 18,
        color: 'red'
    },
    formView: {
        padding: 20
    }
})

export default SignInScreen