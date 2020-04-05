import React, { useContext } from 'react'
import { View, StyleSheet, Text, Button, Image } from 'react-native'
import Spacer from './components/spacer'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'


const DealList = (props) => {
    return <><View style={styles.viewStyle}>
        <FlatList
            data={props.deals}
            renderItem={({ item }) => {
                return <>
                    <TouchableOpacity
                    onPress={()=>props.viewDetail(item.key)}
                    style={styles.list} 
                     >
                        <Image
                            style={styles.image}
                            source={{ uri: item.media[0] }} />
                        <View style={styles.details}>
                            <Text style={styles.textTitle}>{item.title}</Text>
                            <View style={styles.flex}>
                                <Text style={styles.textPrice}>{item.price}</Text>
                                <Text style={styles.textName}>{item.cause.name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </>
            }}
        />
    </View>
    </>
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 150
    },
    list: {
        // border:'1px solid'
        backgroundColor: 'white',
        margin: 10
    },
    viewStyle: {
        // margin: 10
    },
    textTitle: {
        fontSize: 16,
        fontWeight: "bold"
    },
    textPrice: {
        fontSize: 14,
    },
    textName: {
        fontSize: 14,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:20
    },
    details:{
        padding:10
    }
})

export default DealList