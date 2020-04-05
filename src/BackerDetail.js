import React, { useEffect, useContext, useState } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, PanResponder, Animated, Dimensions } from 'react-native'
import { Context } from './context/AuthContext'

const BakerDetail = (props) => {
    const { state, getDealDetail } = useContext(Context)
    const { itemId } = props.navigation.state.params
    const [index, setIndex] = useState(0)
    const width = Dimensions.get('window').width

    ImageXPos = new Animated.Value(0)

    ImagePanResponser = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gs) => {
            ImageXPos.setValue(gs.dx)
        },
        onPanResponderRelease: (evt, gs) => {

            if (Math.abs(gs.dx) > width * 0.2) {
                const direction = Math.sign(gs.dx)
                // Swipe left
                Animated.timing(ImageXPos, {
                    toValue: direction * width,
                    duration: 250,
                    useNativeDriver: false
                }).start(() => handleSwipe(-1 * direction))
            }
            else {
                Animated.timing(ImageXPos, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: false
                }).start()
            }
        }
    })

    handleSwipe = (indexDirection) => {
        if (!state.DealDetail.media[index + indexDirection]) {
            Animated.timing(ImageXPos, {
                toValue: 0,
                useNativeDriver: false
            }).start()
            return
        }
        setIndex(index + indexDirection)
        ImageXPos.setValue(indexDirection * width)
        Animated.spring(ImageXPos, {
            toValue: 0,
            useNativeDriver: false
        }).start()
    }

    useEffect(() => {
        getDealDetail({ itemId })
    }, [])
    return <ScrollView style={styles.topView}>
        {state.DealDetail ? <><Animated.Image
            {...ImagePanResponser.panHandlers}
            style={[{ left: ImageXPos }, styles.image]}
            source={{ uri: state.DealDetail.media[index] }} />
            <View style={styles.viewTitle}>
                <Text style={styles.textTitle}>{state.DealDetail.title}</Text>
            </View>
            <View style={styles.wrapperDetail}>
                <View style={styles.flex}>
                    <View>
                        <Text style={styles.name}>{state.DealDetail.cause.name}</Text>
                    </View>
                    <View style={styles.flexView}>
                        <Image source={{ uri: state.DealDetail.user.avatar }} style={styles.avatar} />
                        <Text>{state.DealDetail.user.name}</Text>
                    </View>
                </View>
                <View style={styles.description}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Description:</Text>
                    <Text style={{ textAlign: 'justify' }}>{state.DealDetail.description}</Text>
                </View>
            </View>

        </> : null}
    </ScrollView>
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 150
    },
    wrapperDetail: {
        padding: 20,
        borderColor: '#bbb',
        borderWidth: 1,
        backgroundColor: '#FFFAFA'
    },
    topView: {
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
    },
    details: {
        padding: 10
    },
    avatar: {
        width: 60,
        height: 60
    },
    viewTitle: {
        padding: 10,
        backgroundColor: '#ffb347'
    },
    description: {
        // margin:10
        marginTop: 20,
        // paddingLeft:0
    },
    flexView: {
        width: '50%',
        alignItems: 'center'
    }
})

export default BakerDetail