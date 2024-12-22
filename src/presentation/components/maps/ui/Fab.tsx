import Icon from '@react-native-vector-icons/ionicons';
import React from 'react'
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface Props {
    icon: any;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const Fab = ({ icon, onPress, style }: Props) => {
  return (
    <View style={[styles.btn, style]}>
        <Pressable onPress={onPress}>
            <Icon name={icon} size={30} color={'white'} />
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    btn: {
        zIndex: 1,
        position: 'absolute',
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 0.27,
            width: 4.5
        },
        elevation: 5
    }
})