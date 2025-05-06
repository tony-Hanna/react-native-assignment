import { StyleSheet } from "react-native"

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    card: { 
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)', // subtle white borde
        elevation: 0.4,
      },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 30,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 48,
        borderColor: '#ccc',   
        borderWidth: 1,      
        marginBottom: 16,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginHorizontal: 5
      },
    button: {
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        width:325,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    signupText: {
        textAlign: 'center',
        marginTop: 16,
    }
})