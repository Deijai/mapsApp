import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
      },
      map: {
        flex: 1
      },
    btnPrimary: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100
    }
});