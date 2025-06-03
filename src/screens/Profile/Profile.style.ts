import { StyleSheet } from 'react-native';
import { Theme } from '../../store/themeContext';
import { normalizeWidth, normalizeHeight } from '../../utils/scale';
import { primaryColor } from '../../constants/primaryColor';
export const createStyles = (theme: Theme, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: normalizeWidth(20),
    },
    logo: {display:'flex', flexDirection:'row', alignItems:'center',marginLeft:7},
    lottieAnimation:{
      width: normalizeWidth(70),
      height: normalizeWidth(70),
      marginBottom: normalizeHeight(20),
    },
    emailIconWrap: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      marginBottom:18
    },
    email: {
      marginLeft:5
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 10,
      marginBottom: normalizeHeight(20),
      marginTop:10
    },
    title: {
      fontSize: normalizeWidth(24),
      fontWeight: 'bold',
      color: theme.text,
    },
    logoutText: {
      color: theme.text,
      fontSize: normalizeWidth(16),
    },
    profileImageContainer: {
      alignItems: 'center',
      marginBottom: normalizeHeight(30),
    },
    profileImage: {
      width: normalizeWidth(120),
      height: normalizeWidth(120),
      borderRadius: normalizeWidth(60),
      marginBottom: normalizeHeight(10),
    },
    editImageButton: {
      padding: normalizeWidth(10),
    },
    editImageText: {
      color: theme.text,
      fontSize: normalizeWidth(16),
    },
    form: {
      width: '100%',
    },
    input: {
      marginBottom: normalizeHeight(15),
    },
    button: {
      padding: normalizeWidth(15),
      borderRadius: normalizeWidth(10),
      alignItems: 'center',
      marginTop: normalizeHeight(20),
      backgroundColor: primaryColor
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      color: '#fff',
      fontSize: normalizeWidth(16),
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      fontSize: normalizeWidth(12),
      marginTop: normalizeHeight(-10),
      marginBottom: normalizeHeight(10),
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      elevation: 5,
    },
    modalContent: {
      width: '80%',
      backgroundColor: theme.background,
      borderRadius: 12,
      padding: 20,
      alignItems: 'center',
      elevation: 6,
      alignSelf: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
      color: theme.text,
    },
    modalButton: {
      width: '100%',
      backgroundColor: theme.background,
      borderRadius: 8,
      paddingVertical: 12,
      marginVertical: 8,
      alignItems: 'center',
    },
    modalButtonText: {
      color: theme.text,
      fontWeight: '500',
      fontSize: 16,
    },
    cancelText: {
      color: theme.text,
      marginTop: 10,
      fontSize: 16,
    },
    logoutBotton: {
      backgroundColor: '#FF3B30', // Blue for Save Changes
      paddingVertical: 6,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
    },
    
  }); 