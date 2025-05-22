import { Linking, Text, View, StyleSheet, Pressable } from 'react-native';
import { CustomText } from '../../components/atoms/CustomText/CustomText';
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera';
import { useCallback, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { usePhotoStore } from '../../store/photoStore';
import { useRoute } from '@react-navigation/native';
const CameraScreen = () => {
    const { hasPermission, requestPermission } = useCameraPermission()
    const { setProfilePhoto, setProductPhoto, setEditProductPhoto } = usePhotoStore()
    const navigation = useNavigation()
    const device = useCameraDevice('back')
    const camera = useRef<Camera>(null)
    const route = useRoute()
    const { type } = route.params as { type: 'profile' | 'product' | 'editProduct' }
    const handleCameraPermission = useCallback( async() => {
        if (hasPermission) {
            return
        }
        const result = await requestPermission()
        console.log(result)
    }, [hasPermission, requestPermission])

    useEffect(() => {
        handleCameraPermission()
    }, [handleCameraPermission])

    const openSettings = async () => {
        console.log('openSettings')
        await Linking.openSettings()
    }
    const handleTakePhoto = async () => {
        const photo = await camera.current?.takePhoto({enableShutterSound: true})
        navigation.goBack()
        console.log(photo)
        if(type === 'profile') {
            setProfilePhoto(photo?.path || '')
        } else if(type === 'product'){
            setProductPhoto(photo?.path || '')
        } else if(type === 'editProduct'){
            setEditProductPhoto(photo?.path || '')
        } else {
            console.log('No type found')
        }
    }
    if(!hasPermission) {
        return <CustomText>No permission to use camera <CustomText onPress={openSettings}>Click here to grant permission</CustomText></CustomText>
    }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Pressable onPress={openSettings}><Text>Click here to grant permission</Text></Pressable>
        <Camera
            style={StyleSheet.absoluteFill}
            ref={camera}
            device={device!}
            isActive={true}
            photo={true}
            />
        <View
            style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: 'white',
                position: 'absolute',
                bottom: 30,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable
                onPress={handleTakePhoto}
                style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                backgroundColor: 'red',
                }}
            />
            </View>

    </View>
  );
};

export { CameraScreen };
