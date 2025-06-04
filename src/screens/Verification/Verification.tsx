import React, { useMemo, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema } from '../../schema/otpSchema';
import type { otpField } from '../../schema/otpSchema'
import { verificationStyles } from './verification.style';
import { useTheme } from '../../store/themeContext';
import LinearGradient from "react-native-linear-gradient"
import { useMutation } from '@tanstack/react-query';
import { verifyOtp } from '../../api/verifyotp';
import { useRoute, RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/stacks/types';
import Toast from 'react-native-toast-message';
import { resendOtp } from '../../api/resendOtp';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type VerificationScreenRouteProp = RouteProp<AuthStackParamList, 'Verification'>;
type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const Verification = () => {
    const route = useRoute<VerificationScreenRouteProp>();
    const { email, password } = route.params;
    const { theme } = useTheme()
    const styles = useMemo(() => verificationStyles(theme),[theme])
    const navigation = useNavigation<NavigationProp>()
    const { control, handleSubmit, formState: { isValid } } = useForm<otpField>({
      resolver: zodResolver(otpSchema),
      defaultValues: { d1: '', d2: '', d3: '', d4: '', d5: '', d6: '' }
    });

    const refs: Record<keyof otpField, React.RefObject<TextInput | null>> = {
      d1: useRef<TextInput | null>(null),
      d2: useRef<TextInput | null>(null),
      d3: useRef<TextInput | null>(null),
      d4: useRef<TextInput | null>(null),
      d5: useRef<TextInput | null>(null),
      d6: useRef<TextInput | null>(null),
    };
    const { mutate: resendOtpMutate, isPending: isResending } = useMutation({
      mutationFn: () => resendOtp(email),
      onSuccess: (data) => {
        Toast.show({
          type: 'success',
          text1: 'OTP resent',
          text2: 'Please check your email.',
        });
      },
      onError: () => {
        Toast.show({
          type: 'error',
          text1: 'Failed to resend OTP',
        });
      },
    });
    const {mutate, isPending} = useMutation({
      mutationFn: (otp: string) => verifyOtp(email, otp, password),
      onSuccess: () => {
        navigation.navigate('Login')
        Toast.show({
          type: 'success',
          text1: 'Email verified',
          text2: 'Enter your email and password',
        });
      },
      onError: () => {
        Toast.show({
          type: 'error',
          text1: 'Failed to verify email',
        });
      }
    })

    const onSubmit = (data: otpField) => {
      const code = data.d1 + data.d2 + data.d3 + data.d4 + data.d5 + data.d6;
      if (code) {
        mutate(code)
      } 
    };

    const renderInput = (name: keyof typeof refs, nextRef: keyof typeof refs | null) => (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={refs[name]}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={(text) => {
              onChange(text);
              if (text && nextRef) {
                refs[nextRef]?.current?.focus();
              }
            }}
          />
        )}
      />
    );

    return (
      <LinearGradient
        colors={theme.gradient} 
        style={{flexGrow: 1}}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Enter 6-digit Code</Text>
          <View style={styles.inputsRow}>
            {renderInput('d1', 'd2')}
            {renderInput('d2', 'd3')}
            {renderInput('d3', 'd4')}
            {renderInput('d4', 'd5')}
            {renderInput('d5', 'd6')}
            {renderInput('d6', null)} 
          </View>
          <TouchableOpacity 
            style={[
              styles.button,
              !isValid && { opacity: 0.5 }
            ]} 
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            <Text style={styles.buttonText}>{isPending ? 'Verifying...' : 'Verify'}</Text>
            
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => resendOtpMutate()}
            disabled={isResending}
          >
            <Text style={styles.buttonText}>
              {isResending ? 'Resending...' : 'Resend Code'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
}

export {Verification}
