import { StyleSheet } from "react-native";
export const errorStyles = StyleSheet.create({
    container: {
        height:20, 
        alignSelf:'center'
    },
    message : {
        color:'red', 
        fontWeight: 'bold', 
        marginLeft:3
    },
    wrap: {
        display: 'flex', 
        flexDirection: 'row'
    }

})